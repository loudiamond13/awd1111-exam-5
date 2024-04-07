import React, { useContext, useState } from "react";
import Toast from '../components/Toast';
import PropTypes from 'prop-types'; // Import PropTypes






const AppContext = React.createContext();


export const AppContextProvider = ({children}) => {
  const [toast, setToast] = useState(undefined);
  //const {isError, data} = useQuery('currentUser', apiClient.currentUser, {retry:false});


  return(
    <AppContext.Provider
      value={{ showToast: (toastMessage) => {setToast(toastMessage)},}}>
      {toast &&
      (<Toast message={toast.message} type={toast.type} onClose={()=> setToast(undefined)} />)}
      {children}
    </AppContext.Provider>
  );
}

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired // Validate the children prop
};


export const useAppContext=()=>{
  const context = useContext(AppContext);
  return context;
}