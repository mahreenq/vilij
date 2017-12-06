import { NavigationActions } from '@expo/ex-navigation';
import Store from '../redux/store';
import {RootStackNavigator} from '../navigation/RootNavigation';

export const goToParent = (parentsData) => {
    Store.dispatch(NavigationActions.push(
      'root', 
      RootStackNavigator.getRoute('parent', { parentsData })
    ));
  }
  
  export const goBack = () => {
    RootStackNavigator.dispatch(NavigationActions.pop('root'));
   };