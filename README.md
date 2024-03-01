# NutriNavigator

NutriNavigator is a full-stack fitness project aimed at helping users track their meals and maintain a healthy diet. This project utilizes an Express.js server for the backend and a React.js frontend to provide an interactive user interface. 

## Features

- **Meal Input**: Users can input the meals they've eaten, including details like meal name, ingredients, portion size, and time of consumption.
- **Nutritional Information**: The application calculates and displays the nutritional information of each meal, such as calories, macronutrients (carbohydrates, proteins, fats).
- **Meal History**: Users can view their meal history, allowing them to track their dietary habits over time.


### Backend

- **Express.js**: A minimalist web framework for Node.js used to build the server-side application.
- **MongoDB**: A NoSQL database used to store user data, meal information, and other application-related data.
- **Mongoose**: A MongoDB object modeling tool designed to work in an asynchronous environment, used to simplify interactions with the MongoDB database.

### Frontend

- **React.js**: A JavaScript library for building user interfaces, used to create an interactive and dynamic frontend.
- **React Router**: A routing library for React.js applications, used for navigation within the application.
- **Material-UI**: A popular React UI framework for building responsive and aesthetically pleasing user interfaces.

## Getting Started

To get started with NutriNavigator locally, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using:

   ```
   git clone https://github.com/yourusername/nutrinavigator.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install the dependencies for both the frontend and backend:

   ```
   cd nutrinavigator
   cd frontend
   npm install
   cd ..
   cd backend
   npm install
   ```

3. **Set Up Environment Variables**: Create a `.env` file in the `backend` directory and define the following environment variables:

   ```
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the Development Servers**: Start both the frontend and backend development servers:

   - Frontend: In the `frontend` directory, run `npm start`.
   - Backend: In the `backend` directory, run `npm start`.

5. **Access the Application**: Open your web browser and navigate to `http://localhost:3000` to access the NutriNavigator application.

## Contributing

Contributions are welcome! If you'd like to contribute to NutriNavigator, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.




