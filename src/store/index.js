import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
import logger from '../middlewares/logger'
import DevToolsContainer from '../containers/DevTools'

const store = compose(
    applyMiddleware(logger),
    DevToolsContainer.instrument()
)(createStore)(reducer)

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducer', () => {
        const nextRootReducer = require('../reducer')
        store.replaceReducer(nextRootReducer)
    })
}


export default store