import "../App.css";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useState } from 'react'

function BottomMenu() {
  const [value, setValue] = useState('recents')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className="bottom">
              <BottomNavigation value={value} onChange={handleChange} style={{ width: 500, margin: '70px auto' }} sx={{ display: { sm: "none" } }}>
                <BottomNavigationAction label="Recents" value="recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Nearby" value="nearby" icon={<LocationOnIcon />} />
                <BottomNavigationAction label="Folder" value="folder" icon={<FolderIcon />} />
            </BottomNavigation>
    </div>
  );
}
export default BottomMenu;