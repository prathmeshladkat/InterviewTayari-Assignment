## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/prathmeshladkat/InterviewTayari-Assignment
   cd InterviewTayari-Assignment
   ```

2. Install dependencies:

   ```bash
   npm i
   ```

3. Configure environment variables:

   - Create a `.env` file based on the `.env.example` template.
   - Set up your MongoDB URI and other necessary configurations.

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth

- `POST /signup`: Creat a user profile
- `POST /login`: For user Login
- `POST /logout`: For user Logout

### Profile

- `GET /profile/view`: To get user profile.
- `PATCH /profile/edit`: To edit profile information.

### Submission

- ` GET /feed`: To get all interview experince.
- ` GET /submissions/user`: To get interview experince submitted by Loggedin user.
- `POST /mysubmissions`: To submit the interview experince by Logged in user.
- `GET /search`: To get the results of search query from database.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
