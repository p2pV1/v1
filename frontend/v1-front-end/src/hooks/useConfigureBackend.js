import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBackendUrl } from "../components/redux/backendSlice";

// Custom hook to configure the backend URL
const useConfigureBackend = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const protocol = window.location.protocol; // 'http:' or 'https:'
    const backendUrl =
      protocol === "https:"
        ? "https://backend-service-rojjrgeqna-ue.a.run.app"
        : "http://localhost:8080";

    dispatch(setBackendUrl(backendUrl));
    console.log("backendUrl from useConfigureBackend", backendUrl);
    console.log("protocol from useConfigureBackend", protocol);
  }, [dispatch]); // Runs only once when the component mounts
};

export default useConfigureBackend;
