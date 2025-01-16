import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/landing";
import Body from "./components/body";
import LoginMain from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Signup from "./components/Signup";
//import Feed from "./components/feed";
import InterviewFeeds from "./components/feed";
//import InterviewFeeds from "./components/feedmain";
import MySubmission from "./components/mysubmission";
import SubmissionDetail from "./components/myExperince";
import SearchResults from "./components/SearchComponent";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<LoginMain />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Home" element={<InterviewFeeds />} />
              <Route path="/mysubmission" element={<MySubmission />} />
              <Route path="/myexperince" element={<SubmissionDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
