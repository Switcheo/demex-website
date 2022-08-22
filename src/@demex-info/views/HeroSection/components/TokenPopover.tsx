import {
  CoinIcon, PaperBox, RenderGuard, TypographyLabel,
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
              <Box key={token} className={classes.tokenWrapper}>
                <CoinIcon className={classes.coinSvg} denom={tokenName.toLowerCase()} />
                <TypographyLabel className={classes.tokenName}>
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
  tokenWrapper: {
    display: "flex",
    margin: "0.5rem 0 0.5rem",
    "&:first-child": {
      marginTop: 0,
    },
    "&:last-child": {
      marginBottom: 0,
    },
  },
  coinSvg: {
    maxHeight: "1.125rem",
    maxWidth: "1.125rem",
    minHeight: "1.125rem",
    minWidth: "1.125rem",
  },
  dropdownPaper: {
    backgroundColor: theme.palette.background.secondary,
    padding: theme.spacing(2),
    zIndex: 3,
    borderRadius: 4,
    boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.64)",
    maxHeight: "14rem",
    overflowY: "auto",
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(1.5, 2),
    },
  },
  tokenName: {
    ...theme.typography.body3,
    color: theme.palette.text.secondary,
    marginLeft: "0.5rem",
  },
}));

export default TokenPopover;
