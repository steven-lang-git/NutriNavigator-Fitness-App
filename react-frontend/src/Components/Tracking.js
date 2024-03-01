import React, { useEffect, useRef, useState } from 'react'
import BottomMenu from './BottomMenu'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import "../styles/Home.css"
import Header from './header';
import { CssBaseline } from '@material-ui/core';
import EnhancedTable from './EnhancedTable'
// import makeData from '../makeData'
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import AddMeal from "./AddMeal";
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import macro_img from '../images/Macros.png';
import week_img from '../images/Week.png';
import month_img from '../images/Month.png';




//try to run a mutation in here to see if that works
function Tracking() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Food Name',
                accessor: 'foodname',
            },
            {
                Header: 'Calories',
                accessor: 'calories',
            },
            {
                Header: 'Fat',
                accessor: 'fat',
            },
            {
                Header: 'Carbs',
                accessor: 'carbs',
            },
            {
                Header: 'Protein',
                accessor: 'protein',
            },

        ],
        []
    )

    const GET_MEALS = gql`
    {
        meals{
            id
            foodname
            calories
            fat
            carbs
            protein
        }
    }
    `;



    const list_columns = ['foodname', 'calories', 'fat', 'carbs', 'protein']

    const [skipPageReset, setSkipPageReset] = React.useState(false)
    const { loading, error, data, refetch } = useQuery(GET_MEALS)
    const [totalCalsValue, setTotalCalsValue] = React.useState(0)
    const [totalFatValue, setTotalFatValue] = React.useState(0)
    const [totalCarbsValue, setTotalCarbsValue] = React.useState(0)
    const [totalProteinValue, setTotalProteinValue] = React.useState(0)
    const [info, setInfo] = React.useState([])
    useEffect(() => {
        if (!loading) {
            setInfo(data.meals)
            setTotalCalsValue((data.meals.reduce((a, v) => a = a + parseInt(v.calories), 0)) ?? 0)
            setTotalFatValue((data.meals.reduce((a, v) => a = a + parseInt(v.fat), 0)) ?? 0)
            setTotalCarbsValue((data.meals.reduce((a, v) => a = a + parseInt(v.carbs), 0)) ?? 0)
            setTotalProteinValue((data.meals.reduce((a, v) => a = a + parseInt(v.protein), 0)) ?? 0)
            console.log("Page data", data.meals);
            refetch()
        }
    }, [loading, data])

    var totalMacros = {
        'totalCals': totalCalsValue,
        'totalFat': totalFatValue,
        'totalCarbs': totalCarbsValue,
        'totalProtein': totalProteinValue
    };

    var recommendedMacros = {
        'totalCals': 2717,
        'totalFat': 80,
        'totalCarbs': 275,
        'totalProtein': 224,
    };

    const remMacros = {};

    for (var key in recommendedMacros) {
        if (recommendedMacros.hasOwnProperty(key)) {
            remMacros[key] = parseInt(recommendedMacros[key] - totalMacros[key]);
        }
    }
    // stop table from resetting page index when you update data
    //when cell renderer calls updateData, will use rowIndex, columnID and new value to update original data
    const updateData = (rowIndex, columnId, value) => {
        setSkipPageReset(true)
        setInfo(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[row],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }



    return (
        <div>
            <Header />
            <div className="home-feature-section wf-section">
                <div className="home-feature-wrapper">
                    <div className="home-feature-top-contain">
                        <div className="content-wrapper">
                            <h2 className="home-feature-heading">
                                Follow along your delcious
                                <span className="yellow-line-span"> meals</span>
                            </h2>
                        </div>
                        <div className="content-wrapper">
                            <div className="home-feature-subtext">We're curious about what delicious treats you have devoured. Enter your next meal and follow your journey.</div>
                        </div>
                    </div>
                    <div className="home-feature-item">

                        <CssBaseline />
                        {/*make sure it is rendered before loading the data */}
                        {/* if equates to true the expression after && will render */}
                        {loading}
                        {error && <p>Something went wrong...</p>}

                        {
                            <EnhancedTable
                                columns={columns}
                                data={info}
                                setData={setInfo}
                                updateData={updateData}
                                skipPageReset={skipPageReset}
                            />}

                        <div className="home-feature-item-bg">
                        </div>
                    </div>
                    <div className="row">
                        <div id="w-node-_5213858a-bbbc-2ee0-528a-1c5d9dc29680-8400aadb" className="home-feature-item vertical">
                            <div className='home-feature-item-heading'>Calories consumed:</div>
                            <div className="_76px-heading secondary-2" >{totalCalsValue}&nbsp;(g)</div>
                            <div className='home-feature-item-heading'>Calories remaining:</div>
                            <div className="_76px-heading _2" >{remMacros.totalCals}&nbsp;(g)</div>
                            <div className="home-feature-item-bottom-wrap">
                                <a href="https://webflow.com/" target="_blank" className="learn-more-button w-inline-block">
                                    <div>Learn more</div>
                                    <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cca1b7615187d4fb808fa_Yellow%20Arrow.svg" loading="lazy" alt="" className="learn-more-button-icon"></img>
                                    <div className="learn-more-button-line"></div>
                                </a>
                            </div>

                        </div>
                        <div id="w-node-_5213858a-bbbc-2ee0-528a-1c5d9dc29680-8400aadb" className="home-feature-item vertical">
                            <div className='home-feature-item-heading'>Fats consumed:</div>
                            <div className="_76px-heading secondary-2" >{totalFatValue}&nbsp;(g)</div>
                            <div className='home-feature-item-heading'>Fats remaining:</div>
                            <div className="_76px-heading _2" >{remMacros.totalFat}&nbsp;(g)</div>
                            <div className="home-feature-item-bottom-wrap">
                                <a href="https://webflow.com/" target="_blank" className="learn-more-button w-inline-block">
                                    <div>Learn more</div>
                                    <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cca1b7615187d4fb808fa_Yellow%20Arrow.svg" loading="lazy" alt="" className="learn-more-button-icon"></img>
                                    <div className="learn-more-button-line"></div>
                                </a>
                            </div>
                        </div>
                        <div id="w-node-_5213858a-bbbc-2ee0-528a-1c5d9dc29680-8400aadb" className="home-feature-item vertical">
                            <div className='home-feature-item-heading'>Carbs consumed:</div>
                            <div className="_76px-heading secondary-2" >{totalCarbsValue}&nbsp;(g)</div>
                            <div className='home-feature-item-heading'>Carbs remaining:</div>
                            <div className="_76px-heading _2" >{remMacros.totalCarbs}&nbsp;(g)</div>
                            <div className="home-feature-item-bottom-wrap">
                                <a href="https://webflow.com/" target="_blank" className="learn-more-button w-inline-block">
                                    <div>Learn more</div>
                                    <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cca1b7615187d4fb808fa_Yellow%20Arrow.svg" loading="lazy" alt="" className="learn-more-button-icon"></img>
                                    <div className="learn-more-button-line"></div>
                                </a>
                            </div>
                        </div>

                        <div id="w-node-_5213858a-bbbc-2ee0-528a-1c5d9dc29680-8400aadb" className="home-feature-item vertical">
                            <div className='home-feature-item-heading'>Protein consumed:</div>
                            <div className="_76px-heading secondary-2" >{totalProteinValue}&nbsp;(g)</div>
                            <div className='home-feature-item-heading'>Protein remaining:</div>
                            <div className="_76px-heading _2" >{remMacros.totalProtein}&nbsp;(g)</div>
                            <div className="home-feature-item-bottom-wrap">
                                <a href="https://webflow.com/" target="_blank" className="learn-more-button w-inline-block">
                                    <div>Learn more</div>
                                    <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cca1b7615187d4fb808fa_Yellow%20Arrow.svg" loading="lazy" alt="" className="learn-more-button-icon"></img>
                                    <div className="learn-more-button-line"></div>
                                </a>
                            </div>
                        </div>

                    </div>
                    {/* <div className="home-feature-item">
                        <div className="number-stack-section wf-section">
                            <div className="number-stack-wrapper">
                                <div className="number-stack-contain">
                                    <div className="_76px-heading _1" >
                                        5000+</div>
                                    <div className="_76px-heading _2" >5000+</div>
                                    <div className="_76px-heading secondary-2" >5000+</div>

                                    <div className="number-stack-text">happy &amp; agile teams</div>
                                </div>
                                <div className="number-stack-contain">
                                    <div className="_76px-heading _1" >$21000+</div>
                                    <div className="_76px-heading _2" >$21000+</div>
                                    <div className="_76px-heading secondary-2" >$21000+</div>
                                    <div className="number-stack-text">successful projects</div></div>
                                <div className="number-stack-contain">
                                    <div className="_76px-heading _1" >18000+</div>
                                    <div className="_76px-heading _2" >18000+</div>
                                    <div className="_76px-heading secondary-2">18000+</div>
                                    <div className="number-stack-text">happy &amp; agile teams</div>
                                </div>
                            </div>
                        </div>
                    </div> */}




                    <div className="home-feature-item-grid">
                        <div className="home-feature-item">
                            <div className="home-feature-item-text-contain">
                                <div className="home-feature-item-heading">Sustainable rate of weight loss is approximately 0.5 to 2 pounds per week</div>
                                <div className="home-feature-item-bottom-wrap">
                                    <div className="home-feature-item-subtext">On average, individuals aiming to lose weight typically shed between 1 to 2 pounds per week, highlighting the steady progress achievable through consistent effort and healthy habits. </div>
                                    <a href="https://webflow.com/" target="_blank" className="learn-more-button w-inline-block">
                                        <div>Learn more</div>
                                        <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cca1b7615187d4fb808fa_Yellow%20Arrow.svg" loading="lazy" alt="" className="learn-more-button-icon"></img>
                                        <div className="learn-more-button-line"></div>
                                    </a>
                                </div>
                            </div>
                            <img src={month_img} className="home-feature-item-image"></img>
                            <div className="home-feature-item-bg">
                            </div>
                        </div>

                        <div id="w-node-_5213858a-bbbc-2ee0-528a-1c5d9dc29680-8400aadb" className="home-feature-item vertical">
                            <div className="home-feature-item-heading hide-on-tab">Optimizing Macro Intake</div>
                            <div className="home-feature-item-text-contain hide-on-desktop">
                                <div className="home-feature-item-heading">Build custom end-to-end support an workflows</div>
                                <div className="home-feature-item-bottom-wrap">
                                    <div className="home-feature-item-subtext">Studies indicate that individuals consistently improving their repetition counts in workouts may experience up to a 10% increase in strength gains per month, showcasing the significance of progressive overload in resistance training.</div>
                                    <a href="#" className="learn-more-button w-inline-block">
                                        <div>Learn more</div>
                                        <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cca1b7615187d4fb808fa_Yellow%20Arrow.svg" loading="lazy" alt="" className="learn-more-button-icon"></img>
                                        <div className="learn-more-button-line">
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <img src={macro_img} loading="lazy" alt="" className="home-feature-item-image vertical-item"></img>
                            <div className="home-feature-item-bottom-wrap top-margin-0 hide-on-tab">
                                <div className="home-feature-item-subtext">Balancing macronutrient intake, with a focus on consuming adequate protein, carbohydrates, and fats, is essential for supporting energy levels, muscle recovery, and overall health during fitness endeavors.</div>
                                <a href="https://webflow.com/" target="_blank" className="learn-more-button w-inline-block">
                                    <div>Learn more
                                    </div>
                                    <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cca1b7615187d4fb808fa_Yellow%20Arrow.svg" loading="lazy" alt="" className="learn-more-button-icon"></img>
                                    <div className="learn-more-button-line">
                                    </div>
                                </a>
                            </div>
                            <div className="home-feature-item-bg">
                            </div>
                        </div>

                        <div className="home-feature-item">
                            <div className="home-feature-item-text-contain">
                                <div className="home-feature-item-heading">Experience strength gains</div>
                                <div className="home-feature-item-bottom-wrap">
                                    <div className="home-feature-item-subtext">Studies indicate that individuals consistently improving their repetition counts in workouts may experience up to a 10% increase in strength gains per month, showcasing the significance of progressive overload in resistance training.</div>
                                    <a href="https://webflow.com/" target="_blank" className="learn-more-button w-inline-block">
                                        <div>Learn more</div>
                                        <img src="https://assets.website-files.com/637b5eb9034fec3cec299f9a/637cca1b7615187d4fb808fa_Yellow%20Arrow.svg" loading="lazy" alt="" className="learn-more-button-icon"></img>
                                        <div className="learn-more-button-line"></div>
                                    </a>
                                </div>
                            </div>
                            <img src={week_img} className="home-feature-item-image"></img>
                            <div className="home-feature-item-bg">
                            </div>
                        </div>





                    </div>
                </div>
            </div>

        </div>
    )
}

export default Tracking