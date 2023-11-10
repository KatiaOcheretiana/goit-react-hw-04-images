import { MagnifyingGlass } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <MagnifyingGlass
      visible={true}
      height="120"
      width="120"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{
        justifyContent: 'center',
        margin: '0 auto',
      }}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#c0efff"
      color="#e15b64"
    />
  );
};
