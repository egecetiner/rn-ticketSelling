import {configure} from 'mobx';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Mobx linting configuration
configure({
  enforceActions: 'always',
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
});

AppRegistry.registerComponent(appName, () => App);
