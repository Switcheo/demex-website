import { CaretDown } from "@demex-info/layout/MainLayout/components/Header/assets";
import { Accordion, AccordionDetails, AccordionSummary, makeStyles } from "@material-ui/core";
import React from "react";
import clsx from "clsx";

type AccordionClasses = {
  root?: string;
  accordionDetails?: string;
  acordionSummary?: string;
}

type Props = {
  accordionSummary: React.ReactNode;
  accordionDetails: React.ReactNode;
  accordionClasses?: AccordionClasses
}

const CustomAccordion: React.FC<Props> = (props) => {
  const { accordionSummary, accordionDetails, accordionClasses = {} } = props;

  const classes = useStyles();

  return (
    <Accordion className={clsx(classes.accordion, accordionClasses.root)}>
      <AccordionSummary
        expandIcon={<CaretDown />}
        className={clsx(classes.accordionSummary, accordionClasses.acordionSummary)}
      >
        {accordionSummary}
      </AccordionSummary>
      <AccordionDetails className={clsx(classes.accordionDetails, accordionClasses.accordionDetails)}>
        {accordionDetails}
      </AccordionDetails>
    </Accordion>
  );
};

const useStyles = makeStyles((theme) => ({
  accordion: {
    background: "transparent",
    boxShadow: "none",
    "&:before": {
      display: "none",
    },
    "&.Mui-expanded": {
      margin: 0,
    },
  },
  accordionDetails: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2.5),
    padding: theme.spacing(2, 4, 0),
  },
  accordionSummary: {
    ...theme.typography.title2,
    color: theme.palette.text.secondary,
    height: "32px",
    minHeight: "32px",
    "&.Mui-expanded": {
      height: "32px",
      minHeight: "32px",
      color: theme.palette.text.primary,
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: "12px 0",
    },
    "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
      "& svg > path": {
        fill: theme.palette.text.primary,
      },
    },
  },
}));

export default CustomAccordion;