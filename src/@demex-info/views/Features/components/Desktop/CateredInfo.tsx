import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { CompetitiveFields, TradingInstruments, HighLeverage, CrossChain } from "../../assets";
import CateredCard from "../CateredCard";
import { Fade } from "react-awesome-reveal";

const CateredInfoDesktop: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.cateredInfo}>
      <Fade triggerOnce direction="up">
        <Box display="flex" flexDirection="row" gridGap={24}>
          <Box flex={1}>
            <CateredCard
              title="High Leverage"
              description="Maximize your capital efficiency with up to 100x leverage"
              svgIcon={HighLeverage}
              svgClassName={classes.highLeverageIcon}
            />
          </Box>
          <Box flex={2} display="flex" flexDirection="column" gridGap={24}>
            <Box display="flex" gridGap={24}>
              <Box flex={1}>
                <CateredCard
                  title="Deep Liquidity"
                  description="Access large liquidity pools and minimize slippage"
                />
              </Box>
              <Box flex={1}>
                <CateredCard
                  title="Low Fees"
                  description="Enjoy ultra-low trading fees with zero-gas costs"
                />
              </Box>
            </Box>
            <CateredCard
              title="Fast Execution"
              description="Lightning-fast trades executed in under 1 second"
              endIcon={TradingInstruments}
              endIconClassName={classes.fastExecutionIcon}
              className={classes.fastExcution}
            />
          </Box>
        </Box>
      </Fade>
      <Fade triggerOnce direction="up">
        <Box display="flex" flexDirection="row" gridGap={24}>
          <Box flex={1}>
            <CateredCard
              title="Cross-Chain Liquidity Pools"
              description="Earn across multiple blockchain ecosystems with ease"
              svgIcon={CrossChain}
              svgClassName={classes.crossChainIcon}
              containerClassName={classes.crossChainContainer}
            />
          </Box>
          <Box flex={1}>
            <Box display="flex" flexDirection="column" gridGap={24} height="100%">
              <CateredCard
                title="Nitron Money Market"
                description="Lend and borrow assets on Nitron with additional incentives and flexible terms"
              />
              <CateredCard
                title="Seamless Earning"
                description="No lock-up periods—add or remove liquidity anytime, earning transparently on-chain"
                className={classes.fastExcution}
              />
            </Box>
          </Box>
          <Box flex={1}>
            <CateredCard
              title="Competitive Yields"
              description="Earn high APYs with deep liquidity backing your assets"
              svgIcon={CompetitiveFields}
              svgClassName={classes.cateredIcon}
            />
          </Box>
        </Box>
      </Fade>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  cateredInfo: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(6),
  },
  fastExcution: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  highLeverageIcon: {
    width: "14.75rem",
    height: "10.25rem",
  },
  fastExecutionIcon: {
    width: "16.5rem",
    height: "7.875rem",
  },
  crossChainIcon: {
    width: "14.75rem",
    height: "13.1875rem",
  },
  cateredIcon: {
    width: "14.75rem",
    height: "15rem",
  },
  crossChainContainer: {
    background: "radial-gradient(133.93% 133.93% at 50% -33.93%, #272A2E 0%, #111213 100%)",
  },
}));

export default CateredInfoDesktop;