import { Box, Theme, makeStyles } from "@material-ui/core";
import { CoinIcon, PaperBox, TypographyLabel, withLightTheme } from "@demex-info/components";

import React from "react";
import { RootState } from "@demex-info/store/types";
import { TokenObj } from "@demex-info/store/app/types";
import { useSelector } from "react-redux";

interface Props {
  tokens: string[];
}

const TokenPopover: React.FC<Props> = (props: Props) => {
  const { tokens } = props; // eslint-disable-line no-unused-vars
  const classes = useStyles();

  const { tokens: tokenList } = useSelector((state: RootState) => state.app);

  return (
    <React.Fragment>
      <PaperBox boxClass={classes.dropdownPaper}>
        {
          tokens.map((token: string) => {
            const tokenObj = tokenList.find((tokenObj: TokenObj) => tokenObj?.symbol?.toLowerCase() === token.toLowerCase());
            return (
              <Box display="flex" key={token}>
                <CoinIcon className={classes.coinSvg} denom={token.toLowerCase()} />
                <TypographyLabel className={classes.tokenName} variant="subtitle1" ml={1} color="textSecondary">
                  {tokenObj?.name ?? "-"}
                </TypographyLabel>
              </Box>
            );
          })
        }
      </PaperBox>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  coinSvg: {
    maxHeight: "1.125rem",
    maxWidth: "1.125rem",
    minHeight: "1.125rem",
    minWidth: "1.125rem",
  },
  dropdownPaper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    zIndex: 3,
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1.5, 2),
    },
  },
  tokenName: {
    fontSize: "0.8rem",
  },
}));

export default withLightTheme()(TokenPopover);
