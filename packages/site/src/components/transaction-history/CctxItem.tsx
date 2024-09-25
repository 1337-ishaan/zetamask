import React from 'react';
import styled from 'styled-components/macro';
import { trimHexAddress } from '../../utils/trimHexAddr';
import { getChainIcon } from '../../constants/getChainIcon';
import Typography from '../utils/Typography';
import { ReactComponent as RightArrow } from '../../assets/right-arrow.svg';
import { ReactComponent as RedirectIcon } from '../../assets/redirect.svg';
import FlexRowWrapper from '../utils/wrappers/FlexRowWrapper';
import FlexColumnWrapper from '../utils/wrappers/FlexColumnWrapper';
import InfoBox from '../utils/InfoBox';
import { satsToBtc } from '../../utils/satConverter';

// Styled component for the CctxItem
const CctxItemWrapper = styled(FlexColumnWrapper)`
  background: rgba(0, 0, 0, 0.1);
  row-gap: 8px;
  padding: 24px;
  border-radius: 12px;
  width: 20em;
  a {
    color: #eee;
    font-size: 16px;
  }

  .flex-row {
    row-gap: 12px;
  }

  .chain-swap {
    margin: 16px 0;
    column-gap: 16px;
    justify-content: start;

    .chain-logo {
      height: 48px;
    }
  }

  .arrow-icon {
    width: 48px;
  }

  .redirect-icon {
    width: 16px;
    height: 16px;
  }
`;

// Define the structure of the CctxItemProps interface
interface InboundTxParams {
  sender_chain_id: number;
  amount: number;
  tx_finalization_status: string;
}

interface OutboundTxParams {
  receiver_chainId: number;
  receiver: string;
}

interface Cctx {
  index: string;
  cctx_status: {
    status_message: string;
    lastUpdate_timestamp: string;
  };
  inbound_params: InboundTxParams;
  outbound_params: OutboundTxParams[];
}

interface CctxItemProps {
  cctx: any | Cctx;
}

// CctxItem component definition
const CctxItem: React.FC<CctxItemProps> = ({ cctx }) => {
  // Error handling: Check if cctx is valid
  // if (!cctx || !cctx.inbound_params || !cctx.outbound_params.length) {
  //   return <Typography color="#ff0000">Invalid transaction data.</Typography>;
  // }

  console.log(cctx, 'cctx in trx');

  const { inbound_params, outbound_params, cctx_status, index } = cctx;

  return (
    <CctxItemWrapper>
      <Typography color="#a9a8a8" size={18}>
        ZetaChain CCTX Transaction
      </Typography>
      <FlexRowWrapper className="chain-swap">
        <img
          className="chain-logo"
          // @ts-ignore
          src={getChainIcon(18332)}
          alt=""
        />
        <RightArrow className="arrow-icon" />
        <img
          className="chain-logo"
          // @ts-ignore
          src={getChainIcon(+outbound_params?.[0]?.receiver_chainId)}
          alt=""
        />
      </FlexRowWrapper>
      <FlexRowWrapper className="flex-row">
        <Typography size={16}>
          Trx Hash:{' '}
          <a
            href={`https://athens.explorer.zetachain.com/cc/tx/${index}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {trimHexAddress(cctx?.index)}
            <RedirectIcon className="redirect-icon" />
          </a>
        </Typography>
      </FlexRowWrapper>
      <Typography size={14}>
        Amount after fees:&nbsp;
        {parseFloat(satsToBtc(inbound_params?.amount).toFixed(8))} tBTC
      </Typography>
      <Typography size={14}>
        Created at:{' '}
        {new Date(cctx_status?.lastUpdate_timestamp * 1000).toLocaleString(
          'en-GB',
          { timeZone: 'UTC' },
        )}
      </Typography>
      <FlexRowWrapper className="flex-row">
        <Typography size={14} color="#bed837">
          CCTX Status: {cctx_status?.status_message}
        </Typography>
      </FlexRowWrapper>
      <InfoBox>
        All transactions are processed through ZetaChain, including the cross
        chain transaction. The receiver will always be ZetaChain. For more
        details, visit ZetaScan (Trx Hash).
      </InfoBox>
    </CctxItemWrapper>
  );
};

export default CctxItem;
