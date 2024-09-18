import { useContext } from 'react';
import Header from '../components/header/Header';
import styled from 'styled-components/macro';
import TrxHistory from '../components/transaction-history/TrxHistory';
import { defaultSnapOrigin } from '../config';
import { MetaMaskContext } from '../hooks';
import { isLocalSnap } from '../utils';
import Transact from '../components/transact';
import { ReactComponent as Logo } from '../assets/logo.svg';
import Balances from '../components/balances/Balances';
import FlexColumnWrapper from '../components/utils/wrappers/FlexColumnWrapper';
import Disconnected from '../components/screen/Disconnected';
import FlexRowWrapper from '../components/utils/wrappers/FlexRowWrapper';
import { StoreContext } from '../hooks/useStore';
import SocialLinks from '../components/utils/SocialLinks';

const AppWrapper = styled(FlexColumnWrapper)`
  padding: 16px 32px;
  margin: 0 auto;
  height: fit-content;

  .action-balances-wrapper {
    column-gap: 24px;
  }
  @keyframes animateDropShadow {
    0% { filter: drop-shadow(0 0 160px #676767); }
    50% { filter: drop-shadow(0 0 0px #676767); }
    100% { filter: drop-shadow(0 0 160px #676767); }
  }
    .page-bg-logo {
      position: absolute;
      width: 720px;
      top: 0;
      left: 0;
      opacity: 0.1;
      z-index: 1;
      
      animation: animateDropShadow 3s infinite;
   
    }
  }

  .trx-transact-wrapper {
    row-gap: 24px;
  }
`;

const Index = () => {
  const [state] = useContext(MetaMaskContext);
  const { globalState } = useContext(StoreContext);

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? state.isFlask
    : state.installedSnap;

  const isBtcAddressPresent = !!globalState?.btcAddress;
  return (
    <AppWrapper style={{ rowGap: isBtcAddressPresent ? 'unset' : '15vh' }}>
      <Logo className="page-bg-logo" />
      <Header />
      {!!globalState?.btcAddress ? (
        <FlexRowWrapper className="action-balances-wrapper">
          <FlexColumnWrapper className="trx-transact-wrapper">
            <SocialLinks />
            <Transact />
            <TrxHistory />
          </FlexColumnWrapper>
          <Balances />
        </FlexRowWrapper>
      ) : (
        <Disconnected />
      )}
    </AppWrapper>
  );
};

export default Index;
