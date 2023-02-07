import type { AppProps } from "next/app";
import { wrapper } from "../store/configureStore";
import { Provider } from "react-redux";

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
