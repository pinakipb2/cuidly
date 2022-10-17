import { useRef, useReducer, useEffect } from 'react';

const ACTIONS = {
  LOADING: 'LOADING',
  FETCHED: 'FETCHED',
  ERROR: 'ERROR',
};

const initialState = {
  loading: false,
  error: null,
  data: null,
};

// Use function inside useFetch
/* const func = () => {
    return axios.get('/');
} */

const useFetch = (fetcherFunction) => {
  const cancelRequest = useRef(false);
  const fetchReducer = (state, { type, payload }) => {
    switch (type) {
      case ACTIONS.LOADING:
        return { ...initialState, loading: true };
      case ACTIONS.FETCHED:
        return { ...initialState, loading: false, data: payload };
      case ACTIONS.ERROR:
        return { ...initialState, loading: false, error: payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  useEffect(() => {
    if (!fetcherFunction) return;
    cancelRequest.current = false;
    const fetchData = async () => {
      dispatch({ type: ACTIONS.LOADING });
      try {
        const { data } = await fetcherFunction();
        if (cancelRequest.current) return;
        dispatch({ type: ACTIONS.FETCHED, payload: data });
      } catch (error) {
        console.log(error.message);
        if (cancelRequest.current) return;
        dispatch({ type: ACTIONS.ERROR, payload: error });
      }
    };
    void fetchData();
    return () => {
      cancelRequest.current = true;
    };
  }, []);
  return state;
};

export default useFetch;
