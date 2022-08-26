import {
  CoinIcon, PaperBox, RenderGuard, TypographyLabel, withLightTheme,
} from "@demex-info/components";
import { RootState } from "@demex-info/store/types";
import { Box, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

interface Props {
  tokens: string[];
}

const NameOverride: {
  [key: string]: string;
} = {
  "lkt.bep20.c5a4937a": "Locklet (BEP-20)",
};

const TokenPopover: React.FC<Props> = (props: Props) => {
  const { tokens } = props; // eslint-disable-line no-unused-vars
  const classes = useStyles();

  const { sdk } = useSelector((state: RootState) => state.app);

  return (
    <RenderGuard renderIf={tokens.length > 0}>
      <PaperBox boxClass={classes.dropdownPaper}>
        {
          tokens.map((token: string) => {
            const tokenObj = sdk?.token.tokenForDenom(token);
            const tokenName = sdk?.token.getTokenName(token) ?? "";
            return (
              <Box display="flex" key={token}>
                <CoinIcon className={classes.coinSvg} denom={tokenName.toLowerCase()} />
                <TypographyLabel className={classes.tokenName} variant="body2" ml={1} color="textSecondary">
                  {NameOverride[tokenObj?.id ?? ""] ?? tokenObj?.name ?? "-"}
                </TypographyLabel>
              </Box>
            );
          })
        }
      </PaperBox>
    </RenderGuard>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  coinSvg: {
    maxHeight: "1.125rem",
    maxWidth: "1.125rem",
    minHeight: "1.125rem",
    minWidth: "1.125rem",
    marginTop: 1,
  },
  dropdownPaper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    zIndex: 3,
    maxHeight: "15rem",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      // the actual width is this value minus twice of border width
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
    },
    "&::-webkit-scrollbar-corner": {
      backgroundColor: "transparent",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundClip: "padding-box",
      backgroundColor: theme.palette.divider,
      border: "3px solid",
      borderColor: "transparent",
      // the actual border radius should be this value minus twice of border width
      borderRadius: theme.spacing(2.5),
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1.5, 2),
    },
  },
  tokenName: {
    fontSize: "0.8rem",
  },
}));

export default withLightTheme()(TokenPopover);
