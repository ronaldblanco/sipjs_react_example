/*Start Original code*/
import { SimpleUser, SimpleUserOptions } from "sip.js/lib/platform/web";
import { /*SessionState,*/ UserAgent } from "sip.js";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { debounce, isEmpty } from "lodash";
import { useInterval } from "beautiful-react-hooks";
//import { ThemeProvider } from "styled-components";
//import SelectInput from "@material-ui/core/Select/SelectInput";
import TimerIcon from "@material-ui/icons/Timer";
import {
  Button,
  Container,
  Divider,
  TextField,
  Grid,
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  withStyles,
  createStyles,
  CircularProgress,
  Badge,
  Snackbar,
  Slider,
  Input,
  Avatar,
  PaperProps,
  Select,
  Fade,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import MuiAlert from "@material-ui/lab/Alert";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcCallIcon from "@material-ui/icons/AddIcCall";

import DialerSipIcon from "@material-ui/icons/DialerSip";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import MicOffIcon from "@material-ui/icons/MicOff";
import PanToolIcon from "@material-ui/icons/PanTool";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CloseIcon from "@material-ui/icons/Close";

import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

import { useSelector, useDispatch } from "react-redux";
import Popup from "../../components/Popup";
import { updatePbxInfo } from "../../redux/slices/auth";
import maTheme from "../../theme";
import Api from "../../lib/api";
import { useForm, Controller } from "react-hook-form";
import Controls from "../controls";

var Push = require("push.js");

import PhoneMissedIcon from "@material-ui/icons/PhoneMissed";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
//import PhoneDisabledIcon from "@material-ui/icons/PhoneDisabled";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
//import { pbxDomainsSelector } from "../../redux/slices/pbxDomainsSlice";
//import PhoneCallbackIcon from "@material-ui/icons/PhoneCallback";
//import { on } from "react-use/lib/util";

import VoicemailIcon from "@material-ui/icons/Voicemail";
//import CallIcon from "@material-ui/icons/Call";
import CallEndIcon from "@material-ui/icons/CallEnd";

import RedoIcon from "@material-ui/icons/Redo";

import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

import {
  green,
  red,
  blue,
  grey,
  teal,
  //  yellow,
  // orange,
  // pink,
} from "@material-ui/core/colors";

import styled, { withTheme } from "styled-components";

import VolumeUp from "@material-ui/icons/VolumeUp";

import Backdrop from "@material-ui/core/Backdrop";

const StyledTableRowHead = withStyles((theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: blue[100],
      },
    },
  })
)(TableRow);

const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const StyledTableCellMissed = withStyles((theme) =>
  createStyles({
    body: {
      backgroundColor: red[200],
      fontSize: 14,
      color: "#FFFFFF",
    },
  })
)(TableCell);

const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: ${(props) => props.theme.header.indicator.background};
    color: ${(props) => props.theme.palette.common.white};
  }
`;

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  wrapText: {
    whiteSpace: "normal",
    wordWrap: "break-word",
    maxWidth: "250px",
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  notificationsPopup: {
    width: "700px !important",
  },
  root: {
    width: "100%",
    maxWidth: "70ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  hide: {
    display: "none",
  },
  hide: {
    display: "inLine",
  },
  headerIcon: {
    color: theme.palette.primary.main,
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  pageWelcome: {
    padding: theme.spacing(3),
  },
  welcomeDivider: {
    marginBottom: "10px",
  },
  totalContacts: {
    display: "flex",
    border: "1px solid",
    padding: "3px",
    backgroundColor: "#CCC",
    justifyContent: "center",
  },
  contactsBlock: {
    display: "flex",
    justifyContent: "center",
  },
  approved: {
    backgroundColor: "green",
    flexGrow: 1,
    textAlign: "center",
  },
  working: {
    backgroundColor: "yellow",
    flexGrow: 1,
    textAlign: "center",
  },
  notworking: {
    backgroundColor: "red",
    flexGrow: 1,
    textAlign: "center",
  },
}));

/*End Original code*/
/*Start New code*/

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Box,
  IconButton,
  Paper,
  InputAdornment,
  List,
  ListItem,
  MenuItem,
  NativeSelect,
  InputBase,
} from "@material-ui/core";

import moment from "moment";
import Draggable from "react-draggable";
import Slide from "@material-ui/core/Slide";

import PhoneIcon from "@material-ui/icons/Phone";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DialpadIcon from "@material-ui/icons/Dialpad";

import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

import MicIcon from "@material-ui/icons/Mic";
import PhonePausedIcon from "@material-ui/icons/PhonePaused";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import PhoneForwardedOutlinedIcon from "@material-ui/icons/PhoneForwardedOutlined";
import PhoneCallbackOutlinedIcon from "@material-ui/icons/PhoneCallbackOutlined";
import { height } from "@material-ui/system";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function PaperComponent2(props: PaperProps) {
  return <Paper {...props} style={{ margin: 0, maxHeight: "100%" }} />;
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles3 = makeStyles((theme) => ({
  headerIcon: {
    color: theme.palette.primary.main,
  },
  buttonsConfirmation: {
    width: "100px",
    background: "#FFF",
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
  },
  floatHead: {
    /*bottom: "30px",*/
    /*position: "fixed",*/
    /*right: "0px",*/
    /*zIndex: 10,*/
    /*width: "100%",*/
    /*background: "#FFF",*/
    /*display: "flex",*/
    /*justifyContent: "flex-start",*/
  },
  confirmDialog: {
    zIndex: "2147483647 !important", //2147483647 not all browsers, 16777271 all browsers
    position: "absolute !important",
    display: "flex !important",
    /*boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px",*/
    //display: 'block'
  },
  webPhone: {
    zIndex: "2147483641 !important", //2147483647 not all browsers, 16777271 all browsers
    //position: "absolute",
    //display: 'flex',
    //display: 'block'
  },
}));

const useStyles2 = makeStyles((theme) => ({
  root: {
    position: "initial  !important",
  },
  body: {
    overflow: "auto  !important",
  },
  accept: {
    minWidth: "20%",
    height: "auto",

    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px",
  },
  dialogWrapper: {
    position: "absolute",
    overflow: "auto !important",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px",
    top: "15%",
    // left: "50%",
    borderRadius: "15px",
    minHeight: "50%",
    maxHeight: "60%",
    // height: "fit-content",
    //   width: "fit-content",
    zIndex: theme.zIndex.tooltip + 1000,
    maxWidth: "15%",
    fontfamily: "inherit",
    padding: "inherit",
  },

  spinner: {
    position: "absolute",
    zIndex: 10,
    top: "40%",
    left: "50%",
  },
  spinne2: {
    position: "absolute",
    zIndex: 10,
    top: "30%",
    left: "50%",
  },
  dialogTitle: {
    padding: "5px 10px",
    paddingRight: "0px",

    marginBottom: 0,
    color: "white",

    backgroundColor: "#066fac",
  },
  dialogTitle2: {
    color: "white",
    backgroundColor: "#066fac",
  },
  cursorMove: {
    cursor: "move",
    display: "flex",
    overflow: "hidden",
  },
  button: {
    width: 60,
    height: 60,
    padding: "10% !important",
  },
  buttonSecondScreen: {
    width: 70,
    height: 70,
  },
  recentCallStyle: {
    position: "absolute",
    zIndex: 200000,
    top: "-8px",
    right: "4px",
    color: "black",
    backgroundColor: "white",

    boxShadow:
      "rgb(0 0 0 / 20%) 0px 1px 3px 0px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 2px 1px -1px",
    "&:hover": {
      backgroundColor: "white",

      boxShadow:
        "rgb(0 0 0 / 20%) 0px 1px 3px 0px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 2px 1px -1px",
    },
  },
  buttonNumber: {
    position: "absolute",
  },
  buttonLetters: {
    position: "relative",
    top: "2px",
    fontSize: "0.5em",
  },
  labelColor: {
    color: "white",
    textAlign: "center",
    fontSize: "1.2em",
  },
  noBorder: {
    border: 0,
  },
  historyRow: {
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: grey[100],
    },
  },
  /*DraggableInit: {
    transform: "traslate(10px, 10px) !important",
    width: "300px !important"
  },*/
}));

const useStyles4 = makeStyles((theme) => ({
  dialogWrapper2: {
    position: "absolute",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px",
    //top: "5%",
    // left: "50%",
    borderRadius: "15px",
    minHeight: "50%",
    maxHeight: "60%",
    // height: "fit-content",
    //   width: "fit-content",
    zIndex: theme.zIndex.tooltip + 1000,
    maxWidth: "15%",
    fontfamily: "inherit",
    padding: "inherit",
  },
}));

/*const useGlobalStyles = makeStyles({
  "@global": {
    body: {
      overflow: "auto !important",
    },
  },
});*/

/*End New code*/

function CallGetCallsApp(props /*, context*/) {
  /*Start Original code*/
  // useGlobalStyles();
  const { active } = props;
  const [openAlertM, setOpenAlertM] = useState({
    openAlert: false,
    alertMessage: "",
  });

  const handleCloseAlertM = () => {
    setOpenAlertM({ openAlert: false, alertMessage: "" });

    let tmp = {};

    tmp = {
      ...pbxConfig,
      callToPhone: "Error",
      callToName: "Error",
    };

    dispatch(updatePbxInfo(tmp));
  };

  const { alertMessage, openAlert } = openAlertM;

  const classesold = useStyles3();
  const classes = useStyles();

  const newclass = useStyles2();
  const newclass2 = useStyles4();

  const [callflip, setCallflip] = useState(true); //true
  const [transfer, setTransfer] = useState(false); //false
  const [callPermit, setCallPermit] = useState(false);
  const [recentCall, setRecentCall] = useState(false);

  const [callKeypad, setCallKeypad] = useState(false);

  const [searchContact, setSearchContact] = useState(false);

  const [timerOn, setTimerOn] = useState(false);
  const [timer, setTimer] = useState(0);

  const [searchContactResult, setSearchContactResult] = useState([]);
  const [searchContactResult2, setSearchContactResult2] = useState([]);
  const [searchContactText, setSearchContactText] = useState("");
  const [searchContactText2, setSearchContactText2] = useState("");
  const [backspaceText, setBackspaceText] = useState(false);

  // const [noChange, setNoChange] = useState(false);

  const [keypadText, setKeypadText] = useState("");

  const [loading, setLoading] = useState(false);

  const [callfromEnter, setCallfromEnter] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [callHistoryNew, setCallHistoryNew] = useState([]);
  const reTest = /^[0-9*#+a-z]+$/;
  const reTest2 = /^[0-9*#+]+$/;
  const reTestNumber = /^[0-9*#+]+$/;
  const reTestNumberAsterix = /^[*]/;
  const maxNumberLocal = 14;

  const { authUser, pbxConfig } = useSelector((state) => state.auth);
  const [registered, setRegistered] = useState(
    localStorage.getItem("registered") === "1" ? true : false
  );
  const [inCall, setInCall] = useState(false);

  //const { control } = useForm();

  const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      color: "#066fac",
      fontSize: "0.75rem",
      fontWeight: 400,
      fonFamily: "Lato, Helvetica, Arial, sans-serif",
      lineHeight: "15px",
    },
  }))(InputBase);

  const PrettoSlider = withStyles({
    root: {
      color: "#52af77",
      height: 8,
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const dispatch = useDispatch();

  const [hold, setHold] = useState(false);
  const [mute, setMute] = useState(false);

  const [notification, setNotification] = useState(false);

  const [acceptCall, setAcceptCall] = useState(false);

  const [poster, setPoster] = useState("");

  const [audio, setAudio] = useState(
    localStorage.getItem("registered") === "1" ? true : false
  );
  const [devices, setDevices] = useState(
    localStorage.getItem("devices")
      ? JSON.parse(localStorage.getItem("devices"))
      : null
  );
  const [defaults, setDefaults] = useState(
    localStorage.getItem("defaults")
      ? JSON.parse(localStorage.getItem("defaults"))
      : null
  );

  const [callCheck, setCallCheck] = useState(
    localStorage.getItem("callCheck")
      ? JSON.parse(localStorage.getItem("callCheck"))
      : { input: false, output: false }
  );

  const callInboundSound = document.getElementById("incomingCall");
  const callingSoundReact = document.getElementById("calling");
  const [callingFrom, setCallingFrom] = useState(1);

  const handleChangeCallFrom = (event) => {
    setCallingFrom(event.target.value);
  };

  let phoneRemoteVideo = document.getElementById("remoteVideo");
  const [volumen, setVolumen] = useState(30);

  const volumenControl = (phoneRemoteVideo, newVolumen) => {
    phoneRemoteVideo.volume = newVolumen / 100;
    //phoneRemoteVideo.volume = 0.2;
  };

  const handleVolumenChange = (event, newVolumen) => {
    setVolumen(newVolumen);
    volumenControl(phoneRemoteVideo, newVolumen);
  };

  const handleVolumenInputChange = (event) => {
    setVolumen(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (volumen < 0) {
      setVolumen(0);
    } else if (volumen > 100) {
      setVolumen(100);
    }
  };

  const [showVolumen, setShowVolumen] = useState(false);

  const changeShowVolume = (event) => {
    setShowVolumen(true);

    setTimeout(() => {
      setShowVolumen(false);
    }, 4000);
  };

  const incomingConfirmationDialog = document.getElementById(
    "react-confirm-alert"
  );

  const rootElement = document.getElementById("root");

  const soundReact0 = document.getElementById("0");
  const soundReact1 = document.getElementById("1");
  const soundReact2 = document.getElementById("2");
  const soundReact3 = document.getElementById("3");
  const soundReact4 = document.getElementById("4");
  const soundReact5 = document.getElementById("5");
  const soundReact6 = document.getElementById("6");
  const soundReact7 = document.getElementById("7");
  const soundReact8 = document.getElementById("8");
  const soundReact9 = document.getElementById("9");
  const soundReactStar = document.getElementById("star");
  const soundReactHash = document.getElementById("hash");

  const [simpleUserOnCall, setSimpleUserOnCall] = useState(null);
  const [simpleUserRegistered, setSimpleUserRegistered] = useState(null);

  const [showGetCall, setShowGetCall] = useState(false);
  const [showMakeCall, setShowMakeCall] = useState(false);

  const [phoneBook, setPhoneBook] = useState([]);
  const [callingStatus, setCallingStatus] = useState("");

  const [dbCallRecord, setDBCallRecord] = useState(null);

  const [transferTo, setTransferTo] = useState(null);
  const [transferToName, setTransferToName] = useState(null);

  const [callHistory, setCallHistory] = useState([]);

  const [recording, setRecording] = useState([]);
  const [refresh, setRefresh] = useState(null);
  const [makeHistoryCall, setMakeHistoryCall] = useState(false);
  const [makeHistoryCall2, setMakeHistoryCall2] = useState(false);
  const [historyPage, setHistoryPage] = useState(1);

  const [historyEnd, setHistoryEnd] = useState(false);

  const [voiceMail, setVoiceMail] = useState(false);
  const [redial, setRedial] = useState(false);
  const [callReturn, setCallReturn] = useState(false);

  const [callFromPbxConfig, setCallFromPbxConfig] = useState(false);

  const [newVoiceMails, setNewVoiceMails] = useState(0);
  const [checkVoiceMails, setCheckVoiceMails] = useState(false);

  const [showIncomingCallConfirmation, setShowIncomingCallConfirmation] =
    useState(false);

  const popupRef = useRef();

  let backendServer = process.env.REACT_APP_API_ENDPOINT;

  const updateCallHistory = (callRecord) => {
    let tmp = [];
    callRecord.created_at = callRecord.created_at
      .replace("T", " ")
      .replace(".000000Z", "");
    tmp.push(callRecord);
    callHistory.forEach((call) => {
      tmp.push(call);
    });

    setCallHistory(tmp);
    setRefresh(callRecord.id);

    console.log("updateCallHistory:", tmp);
  };

  const addEndDateToCallById = (id) => {
    console.log("addEndDateToCallById-dbCallRecord", dbCallRecord);
    console.log("addEndDateToCallById(" + id + ")");
    if (id && id > 0) /*const { data } =*/ Api.addEndDateToCall(id);
  };

  const getRecording = async (domain, call, id) => {
    const { data } = await Api.getRecording(domain, call);
    let tmp = recording;
    tmp[id] = data;
    console.log("tmp_recording", tmp);
    setRecording(tmp);
    if (refresh !== id) setRefresh(id);
    else {
      await setRefresh(0);
      setRefresh(id);
    }
    console.log("recording:", recording);
  };

  const getCountOfNewVoiceMails = async () => {
    const { data } = await Api.getCountOfNewVoiceMails();
    if (data && data.length > 0) setNewVoiceMails(data[0].count);
  };

  const getPhoneBookOfUser = async () => {
    try {
      const { data } = await Api.getUserPhoneBook();
      setPhoneBook(data);

      console.log(data);
    } catch (e) {
      console.error("Error Getting the PhoneBook!");
    }
  };

  const setCallsToView = async (id) => {
    try {
      const { data } = await Api.setViewMissedCall(id);
    } catch (e) {
      console.error("Error setting calls " + id + " to view!");
    }
  };

  const setCallHistoryToView = () => {
    callHistory.forEach((call) => {
      if (
        call.view === 0 &&
        call.direction === "inbound" &&
        (call.final_state === null || call.final_state === "voicemail")
      ) {
        setCallsToView(call.id);
      }
    });
  };

  const getUserCallHistory = async (page) => {
    try {
      const { data } = await Api.getUserCallHistory(page, 50);
      setCallHistory(data);
    } catch (e) {
      console.error("Error Getting the Call History!");
    }
  };

  const getUserCallHistoryAppend = async () => {
    try {
      const { data } = await Api.getUserCallHistory(historyPage + 1, 50);
      setHistoryPage(historyPage + 1);
      setCallHistory(callHistory.concat(data));
      if (data.length === 0 || data.length < 50) setHistoryEnd(true);
    } catch (e) {
      console.error("Error Getting the Call History Append!");
    }
    console.log("getUserCallHistoryAppend");
  };

  const addFinalStateToInboundCall = async (org, domain, from, to, state) => {
    try {
      const { data } = await Api.addFinalStateToInboundCalls(
        org,
        domain,
        from,
        to,
        state
      );
      if (state === "answered" && data && data.pbx_uuid) setDBCallRecord(data);
      else setDBCallRecord(null);

      if (data && data.pbx_uuid) updateCallHistory(data);
    } catch (e) {
      console.error(
        "Error adding final state to inbound call!, org, domain, from, to, state -> " +
          org +
          ", " +
          domain +
          ", " +
          from +
          ", " +
          to +
          ", " +
          state
      );
    }
  };

  const addFinalStateToOutboundCall = async (org, domain, from, to, state) => {
    try {
      const { data } = await Api.addFinalStateToOutboundCalls(
        org,
        domain,
        from,
        to,
        state
      );
      if (state === "answered" && data && data.pbx_uuid) setDBCallRecord(data);
      else setDBCallRecord(null);

      if (data && data.pbx_uuid) updateCallHistory(data);
    } catch (e) {
      console.error(
        "Error adding final state to outbound call!, org, domain, from, to, state -> " +
          org +
          ", " +
          domain +
          ", " +
          from +
          ", " +
          to +
          ", " +
          state
      );
    }
  };

  // console.log("dbCallRecord", dbCallRecord);

  const transferCallAction = async (phone) => {
    transferCallTo(dbCallRecord.pbx_uuid, phone, showGetCall ? "a" : "b");
  };

  const transferCallTo = async (callId, destination, leg) => {
    try {
      const { data } = await Api.transfer_call_to(callId, destination, leg);
      setDBCallRecord(null);

      closeWindow();
    } catch (e) {
      console.error(
        "Error error transfering the call!, callId, destination, leg -> " +
          callId +
          ", " +
          destination +
          ", " +
          leg
      );
    }
  };
  const [callerNew, setCallerNew] = useState(null);
  const [contactData, setContactData] = useState([]);
  const [simpleUserIncoming, setSimpleUserIncoming] = useState(null);

  const [openAcceptCall, setOpenAcceptCall] = useState(null);
  const [phoneBookName, setPhoneBookName] = useState(null);
  const [phoneBookPhone, setPhoneBookPhone] = useState("");
  const [redialphone, setRedialphone] = useState("");
  const [message, setMessage] = useState(null);

  const phoneOptions = () => {
    let phones = [];

    phones = phoneBook.map((phone) => {
      return {
        id: phone.phone,
        title: phone.name + " (" + phone.type + ")",
      };
    });

    return phones;
  };

  const phoneOptionsToTransfer = () => {
    let phones = [];

    phones = phoneBook
      .filter((phone) => {
        return phone.type === "user";
      })
      .map((phone) => {
        return {
          id: phone.phone,
          title: phone.name + " (" + phone.type + ")",
        };
      });

    return phones;
  };

  const closeMakeACall = () => {
    let tmp = {};

    tmp = {
      ...pbxConfig,
      makeACall: false,
    };

    dispatch(updatePbxInfo(tmp));
  };

  const registerOnRedux = (status) => {
    let tmp = {};

    tmp = {
      ...pbxConfig,
      registered: status,
    };

    dispatch(updatePbxInfo(tmp));
  };

  const mediaOnRedux = (status) => {
    let tmp = {};

    tmp = {
      ...pbxConfig,
      callCheckMedia: status,
    };

    dispatch(updatePbxInfo(tmp));
  };

  const notificationOnRedux = (status) => {
    let tmp = {};

    tmp = {
      ...pbxConfig,
      callCheckNotification: status,
    };

    dispatch(updatePbxInfo(tmp));
  };

  const checkCallReqOnRedux = (status) => {
    let tmp = {};

    tmp = {
      ...pbxConfig,
      checkCallReq: status,
    };

    dispatch(updatePbxInfo(tmp));
  };

  const devicesOnRedux = (devices, callCheckMedia, callCheckNotification) => {
    let tmp = {};

    tmp = {
      ...pbxConfig,
      defaultsDevices: devices,
      callCheckOutput:
        devices &&
        devices.filter((device) => {
          return device.deviceId === "default" && device.kind === "audiooutput";
        })
          ? true
          : false,
      callCheckInput:
        devices &&
        devices.filter((device) => {
          return device.deviceId === "default" && device.kind === "audioinput";
        })
          ? true
          : false,
      callCheckMedia: callCheckMedia,
      callCheckNotification: callCheckNotification,
    };
    console.error("devicesOnRedux data", tmp);
    dispatch(updatePbxInfo(tmp));
  };

  const receibingControl = () => {
    let tmp = {};

    tmp = {
      ...pbxConfig,
      receive_active: pbxConfig.receive_active ? false : true,
    };

    dispatch(updatePbxInfo(tmp));
  };

  const closeWindow = (makehandup = true) => {
    setShowGetCall(false);
    setShowIncomingCallConfirmation(false);
    setShowMakeCall(false);
    closeMakeACall();
    setPhoneBookPhone("");
    setSearchContactText("");
    setSimpleUserIncoming(null);
    setCallerNew(null);

    setVoiceMail(false);
    setRedial(false);

    setCallReturn(false);
    setCallFromPbxConfig(false);

    callInboundSound ? callInboundSound.pause() : "";
    callingSoundReact ? callingSoundReact.pause() : "";

    if (makehandup) {
      makeHandup();
    }
  };

  const audioRef = useRef(null);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  //const simpleUser: SimpleUser;

  // SIP over WebSocket Server URL
  // The URL of a SIP over WebSocket server which will complete the call.
  // FreeSwitch is an example of a server which supports SIP over WebSocket.
  // SIP over WebSocket is an internet standard the details of which are
  // outside the scope of this documentation, but there are many resources
  // available. See: https://tools.ietf.org/html/rfc7118 for the specification.
  //const server = "wss://fusionpbxclient.teczz.com";
  //const server = "wss://fusionpbxclient.teczz.com:7443/ws";

  // SIP Address of Record (AOR)
  // This is the user's SIP address. It's "Where people can reach you."
  // SIP is an internet standard the details of which are outside the
  // scope of this documentation, but there are many resources available.
  // See: https://tools.ietf.org/html/rfc3261 for the specification.
  //const aor = "sip:55555@fusionpbxclient.teczz.com";
  const aor = pbxConfig.aor;

  const userAgentOptions = {
    uri: UserAgent.makeURI(pbxConfig.aor),
    authorizationPassword:
      /*base64_decode(*/ pbxConfig.authorizationPassword /*)*/,
    authorizationUsername: pbxConfig.authorizationUsername,
    transportOptions: {
      server: pbxConfig.server,
    },
  };

  // Options including delegate to capture response messages
  const inviteOptions = {
    requestDelegate: {
      onAccept: (response) => {
        setCallingStatus("Call Answered and Active");

        addFinalStateToOutboundCall(
          authUser.organization_id,
          pbxConfig.callTo_domain,
          pbxConfig.authorizationUsername,
          phoneBookPhone,
          "answered"
        );

        stopCallingSound();
        setInCall(true);
      },
      onReject: (response) => {
        setCallingStatus("Call Rejected");

        addFinalStateToOutboundCall(
          authUser.organization_id,
          pbxConfig.callTo_domain,
          pbxConfig.authorizationUsername,
          phoneBookPhone,
          "rejected"
        );

        stopCallingSound();
        setInCall(false);
        //addEndDateToCallById(dbCallRecord?dbCallRecord.id:0);
        setCallflip(true);
        setRecentCall(false);
        setSearchContact(false);
        setCallFromPbxConfig(false);
        setTransfer(false);
        setCallPermit(false);
      },
    },
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: true,
        video: false,
      },
      render: {
        remote: { audio: audioRef }, // play remote audio
      },
    },
  };

  const acceptIncomingCall = async (simpleUser, caller) => {
    console.log("Accept Incoming Call");

    try {
      await simpleUser.answer();
      setShowIncomingCallConfirmation(false);
      setInCall(true);
      setShowGetCall(true);
      setSimpleUserOnCall(simpleUser);
      setCallPermit(true);
      setPoster("active_call.jpg");
      setPhoneBookName(caller ? caller + " (Incoming)" : "Incoming");

      await addFinalStateToInboundCall(
        authUser.organization_id,
        pbxConfig.callTo_domain,
        caller,
        pbxConfig.authorizationUsername,
        "answered"
      );
    } catch (e) {
      console.error("Call from " + caller + " had error:" + e);
    }

    setTimeout(() => {
      callInboundSound ? callInboundSound.pause() : "";
    }, 1000);
  };

  const rejectIncomingCall = async (simpleUser, caller) => {
    callInboundSound ? callInboundSound.pause() : "";
    try {
      await simpleUser.decline();
      setShowIncomingCallConfirmation(false);

      await addFinalStateToInboundCall(
        authUser.organization_id,
        pbxConfig.callTo_domain,
        caller,
        pbxConfig.authorizationUsername,
        "rejected"
      );
      console.error("simpleUser, caller", simpleUser, caller);
    } catch (e) {
      console.error("Reject Call from " + caller + " had error:" + e);
    }
  };

  const imcomingDialog = (simpleUser, caller) => {
    /* console.log("Show Incoming Call dialog");

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div id="confirmationDialog">
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Incoming Call</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">{caller}</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={async () => {
                    acceptIncomingCall(simpleUser, caller);
                    onClose();
                  }}
                  style={{
                    color: green[500],
                  }}
                >
                  <PhoneIcon
                    fontSize="large"
                    style={{
                      color: green[500],
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={() => {
                    rejectIncomingCall(simpleUser, caller);
                    onClose();
                  }}
                  style={{
                    color: "#e6423c",
                  }}
                >
                  <CallEndIcon
                    fontSize="large"
                    style={{
                      color: "#e6423c",
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>

            {/*  <h1>Take This Call?</h1>
            <p>{"Are you sure to take the call from " + caller + "?"}</p>

            <button
              onClick={() => {
                acceptIncomingCall(simpleUser, caller);
                onClose();
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                rejectIncomingCall(simpleUser, caller);
                onClose();
              }}
            >
              No
            </button>}
          </div>
        );
      },
      overlayClassName: classesold.confirmDialog,
      closeOnClickOutside: false,

      ref: popupRef,
    });*/
  };

  const showNewIncomingCallNotification = (incoming, simpleUser) => {
    const notification = Push.create(
      "Active Incoming Call from " + incoming + "!",
      {
        body: "Click here to take the call!",
        icon: "/active_call.jpg",
        timeout: 70000,
        onClick: function () {
          setAcceptCall(true);
          window.focus();

          this.close();
        },
      }
    );
  };

  const delegate: SimpleUserDelegate = {
    onCallReceived: async () => {
      setShowIncomingCallConfirmation(true);

      console.error("incoming Call:", simpleUser.session);
      setShowGetCall(false);
      let phone = "";
      let caller = "";
      if (simpleUser.session && simpleUser.session._assertedIdentity) {
        caller =
          simpleUser.session._assertedIdentity.uri.normal.user +
          " (" +
          simpleUser.session._assertedIdentity._displayName +
          ")";

        setPhoneBookPhone(simpleUser.session._assertedIdentity.uri.normal.user);

        setPhoneBookName(simpleUser.session._assertedIdentity._displayName);
        phone = simpleUser.session._assertedIdentity.uri.normal.user;
      } else if (
        simpleUser.session &&
        simpleUser.session._dialog &&
        simpleUser.session._dialog.dialogState
      ) {
        caller = simpleUser.session._dialog.dialogState.remoteURI.normal.user;
        phone = simpleUser.session._dialog.dialogState.remoteURI.normal.user;
        setPhoneBookPhone(
          simpleUser.session._dialog.dialogState.remoteURI.normal.user
        );
        setPhoneBookName("Incoming No Name");
      }

      await getDevices(await getMedia({ audio: true }));
      callInboundSound ? callInboundSound.play() : "";
      console.error(caller);
      if (audio && devices) {
        showNewIncomingCallNotification(caller, simpleUser);

        const params = new URLSearchParams("phone=" + phone);

        const { data } = await Api.getCallContactData(authUser.id, params);
        //console.error("contact!!!! ", data);

        await setContactData(data.data);

        await setCallerNew(caller);
        await setSimpleUserIncoming(simpleUser);

        // imcomingDialog(simpleUser, caller);
      } else {
        callInboundSound ? callInboundSound.pause() : "";
        console.error(
          caller + " call was rejected by user or media problems were found!"
        );
      }
    },
    onCallHangup: async () => {
      try {
        if (simpleUser.session) await simpleUser.hangup();
        if (simpleUserOnCall && simpleUserOnCall.session)
          await simpleUserOnCall.hangup();
        if (simpleUserRegistered && simpleUserRegistered.session)
          await simpleUserRegistered.hangup();

        setInCall(false);
        setPoster("");
        setSimpleUserOnCall(null);
        stopCallingSound();
        setCallingStatus("");
        setShowGetCall(false);
        setSimpleUserIncoming(null);
        setCallerNew(null);
        setSimpleUserIncoming(null);
        setCallerNew(null);

        setShowIncomingCallConfirmation(false);
        setRedial(false);
        setCallReturn(false);
        setCallFromPbxConfig(false);

        addEndDateToCallById(dbCallRecord ? dbCallRecord.id : 0);
        setShowVolumen(false);

        if (
          pbxConfig.callToPhone &&
          pbxConfig.callToName &&
          pbxConfig.makeACall
        ) {
          let tmp = {};

          tmp = {
            ...pbxConfig,
            makeACall: false,
            callToPhone: null,
            callToName: null,
          };

          dispatch(updatePbxInfo(tmp));
          closeWindow();
        }

        if (pbxConfig.receive_calls === false || pbxConfig.secundary === true)
          try {
            await simpleUser.unregister();
            await simpleUser.disconnect();

            if (simpleUserRegistered) {
              await simpleUserRegistered.unregister();
              await simpleUserRegistered.disconnect();
              setSimpleUserRegistered(null);
            }

            if (simpleUserOnCall) {
              await simpleUserOnCall.unregister();
              await simpleUserOnCall.disconnect();
              setSimpleUserOnCall(null);
            }

            console.log("App unRegister");
            setRegistered(false);
            registerOnRedux(false);
          } catch (e) {
            console.error("Error un-registering from the PBX!:" + e);
          }
      } catch (e) {
        console.error("Error on handup the call: " + e);
      }
    },
  };

  const stopCallingSound = async () => {
    callingSoundReact ? callingSoundReact.pause() : "";
  };

  // Configuration Options
  // These are configuration options for the `SimpleUser` instance.
  // Here we are setting the HTML audio element we want to use to
  // play the audio received from the remote end of the call.
  // An audio element is needed to play the audio received from the
  // remote end of the call. Once the call is established, a `MediaStream`
  // is attached to the provided audio element's `src` attribute.
  const options: SimpleUserOptions = {
    aor,
    delegate: delegate,
    media: {
      local: {
        video: document.getElementById("localVideo"),
      },
      remote: {
        audio: document.getElementById("remoteVideo"),
      },
    },
    userAgentOptions: userAgentOptions,
    reconnectionAttempts: 777,
    reconnectionDelay: 4,
  };

  // Construct a SimpleUser instance
  const simpleUser = new SimpleUser(pbxConfig.server, options);

  const getMedia = async (constraints) => {
    let stream = null;

    let result = {};

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      /* use the stream */
      setAudio(true);
      result.audio = true;
    } catch (err) {
      /* handle the error */
      setAudio(false);
      result.audio = false;
    }

    try {
      Notification.requestPermission().then((permission) => {
        console.log(permission);
      });

      setNotification(true);
      result.notification = true;
    } catch (err) {
      result.notification = false;
      console.error("Error getting notification permission!");
    }

    if (
      pbxConfig.receive_calls &&
      !pbxConfig.secundary &&
      pbxConfig.receive_active
    )
      window.addEventListener("beforeunload", function (e) {
        e.preventDefault();
        console.error("closing tab!");

        localStorage.removeItem("registered");
        localStorage.removeItem("devices");
        localStorage.removeItem("defaults");
        localStorage.removeItem("callCheck");

        Api.cleanTemporalRecordingsForUsers();

        e.returnValue = "";
      });

    return result;
  };

  const getDefaults = (devices) => {
    setDefaults(
      devices
        ? devices.filter((device) => {
            return device.deviceId === "default";
          })
        : null
    );
    setCallCheck({
      output:
        devices &&
        devices.filter((device) => {
          return device.deviceId === "default" && device.kind === "audiooutput";
        })
          ? true
          : false,
      input:
        devices &&
        devices.filter((device) => {
          return device.deviceId === "default" && device.kind === "audioinput";
        })
          ? true
          : false,
    });
  };

  const getDevices = async (others) => {
    try {
      let devices = await navigator.mediaDevices.enumerateDevices();

      setDevices(devices);
      devicesOnRedux(
        devices
          ? devices.filter((device) => {
              return device.deviceId === "default";
            })
          : null,
        others.audio,
        others.notification
      );
      getDefaults(devices);
    } catch (err) {
      console.error(err.name + ": " + err.message);
    }
  };

  const makeRegister = async () => {
    console.error(
      "App Register function simpleUser",

      simpleUser
    );

    if (
      (audio === true &&
        pbxConfig.defaultsDevices &&
        pbxConfig.defaultsDevices.length > 1 &&
        pbxConfig.callCheckInput &&
        pbxConfig.callCheckOutput &&
        !registered &&
        !simpleUserRegistered &&
        !pbxConfig.registered &&
        !simpleUser.registerRequested &&
        !simpleUser.registerer &&
        !pbxConfig.registrationError) ||
      (pbxConfig.secundary && !pbxConfig.registrationError) ||
      (!pbxConfig.receive_calls && !pbxConfig.registrationError)
    ) {
      try {
        await simpleUser.connect();
        await simpleUser.register();

        setRegistered(true);
        setSimpleUserRegistered(simpleUser);

        //registerOnRedux(true);

        console.error(
          "App Register execute simpleUser",

          simpleUser.isConnected(),
          typeof simpleUser.registerer,
          //simpleUser.registerer.state,
          simpleUser //.registerer
        );

        if (!pbxConfig.secundary)
          await setTimeout(() => {
            if (
              simpleUser.isConnected() &&
              simpleUser.registerer &&
              simpleUser.registerer.state &&
              simpleUser.registerer.state === "Registered"
            ) {
              //setRegistered(true);

              //setSimpleUserRegistered(simpleUser);

              if (!pbxConfig.secundary) registerOnRedux(true);
            } else {
              setRegistered(false);
              setSimpleUserRegistered(null);
              console.error(
                "Unauthorized attempt of registering on the PBX!, check configuration!"
              );

              let tmp = {};
              tmp = {
                ...pbxConfig,
                registrationError:
                  "Unauthorized attempt of registering on the PBX!, check configuration!",
              };
              dispatch(updatePbxInfo(tmp));
            }
          }, 2000);
      } catch (e) {
        console.error("Error registering on the PBX!:" + e.message);

        let tmp = {};
        tmp = {
          ...pbxConfig,
          registrationError: e.message,
        };
        dispatch(updatePbxInfo(tmp));
      }

      if (pbxConfig.receive_calls && !pbxConfig.secundary) {
        localStorage.setItem("registered", 1);
        localStorage.setItem("devices", JSON.stringify(devices));
        localStorage.setItem("defaults", JSON.stringify(defaults));
        localStorage.setItem("callCheck", JSON.stringify(callCheck));
      }
    } else {
      console.error("No adecuate media for this registration!");
    }
  };

  const unRegister = async () => {
    if (
      simpleUserRegistered &&
      simpleUserRegistered.isConnected() === true &&
      !pbxConfig.registrationError
    ) {
      try {
        if (simpleUserRegistered.session) {
          await simpleUserRegistered.hangup();
          if (simpleUserOnCall && simpleUserOnCall.session) {
            await simpleUserOnCall.hangup();
            setSimpleUserOnCall(null);
          }
        }
        await simpleUserRegistered.unregister();
        await simpleUserRegistered.disconnect();
        setRegistered(false);

        if (pbxConfig.receive_calls && !pbxConfig.secundary) {
          setAudio(false);
          setDevices(null);
          setDefaults(null);
        }

        setSimpleUserRegistered(null);

        registerOnRedux(false);
        console.log("App unRegister");
      } catch (e) {
        console.error("Error un-registering from the PBX!:" + e.message);
      }

      if (pbxConfig.receive_calls && !pbxConfig.secundary) {
        localStorage.removeItem("registered");
        localStorage.removeItem("devices");
        localStorage.removeItem("defaults");
        localStorage.removeItem("callCheck");
      }
    }

    try {
      if (simpleUser.session) await simpleUser.hangup();
      if (!pbxConfig.registrationError) {
        await simpleUser.unregister();
        await simpleUser.disconnect();
      }

      console.log("App unRegister");
    } catch (e) {
      console.error("Error un-registering from the PBX!:" + e.message);
    }
  };

  const makeCall = async (number = null) => {
    if (pbxConfig.registrationError) {
      setOpenAlertM({
        openAlert: true,
        alertMessage:
          "You have registration problems. Please call our customer service representative.",
      });
    } else if (!pbxConfig.callCheckInput) {
      setOpenAlertM({
        openAlert: true,
        alertMessage:
          "No microphone was found on your computer. Your call cannot be connected",
      });
    } else if (!pbxConfig.callCheckOutput) {
      setOpenAlertM({
        openAlert: true,
        alertMessage:
          "No Audio Device was found on your computer. Your call cannot be connected",
      });
    } else if (!pbxConfig.callCheckMedia) {
      setOpenAlertM({
        openAlert: true,
        alertMessage: "Browser Media error. Your call cannot be connected",
      });
    } else {
      let localPhoneBookPhone = number ? number : phoneBookPhone;

      if (phoneBookPhone.length === 10 && callingFrom == 2) {
        localPhoneBookPhone = "+1" + phoneBookPhone;
      } else if (phoneBookPhone.length === 11 && callingFrom == 2) {
        localPhoneBookPhone = "+" + phoneBookPhone;
      } else if (phoneBookPhone.length === 10 && callingFrom == 1) {
        localPhoneBookPhone = "*444" + phoneBookPhone;
      } else if (phoneBookPhone.length === 11 && callingFrom == 1) {
        localPhoneBookPhone = "*444" + phoneBookPhone.slice(1, 11);
      }

      if (pbxConfig.receive_calls === false || pbxConfig.secundary === true)
        await checkReq();

      await getDevices(await getMedia({ audio: true }));

      if (callPermit || number) {
        callingSoundReact.play();

        if (audio && devices && localPhoneBookPhone)
          if (
            simpleUserRegistered &&
            simpleUserRegistered.isConnected() === true
          ) {
            if (!simpleUserRegistered.session)
              try {
                simpleUserRegistered.call(
                  pbxConfig.callTo_start +
                    localPhoneBookPhone +
                    pbxConfig.callTo_domain,
                  {},
                  inviteOptions
                );

                setCallflip(false);
                setSearchContact(false);
                setRecentCall(false);
                setCallKeypad(false);
                setCallReturn(true);

                // setPoster("active_call.jpg");

                setSimpleUserOnCall(simpleUserRegistered);
                setCallingStatus("Calling Destination");
              } catch (e) {
                console.error(
                  "Error making a call to " + localPhoneBookPhone + " !:" + e
                );
              }
          } else {
            if (localPhoneBookPhone)
              try {
                await makeRegister();
                /*simpleUser.call(
                  pbxConfig.callTo_start +
                    localPhoneBookPhone +
                    pbxConfig.callTo_domain,
                  {},
                  inviteOptions
                );
                console.log("simpleUser", simpleUser);
                setPoster("active_call.jpg");

                setSimpleUserOnCall(simpleUser);
                setCallingStatus("Calling Destination");*/
              } catch (e) {
                console.error(
                  "Error registering and making a call to " +
                    localPhoneBookPhone +
                    " !:" +
                    e
                );
              }
          }
      } else
        console.error(
          "You do not comply with all the requiriments to make this call!"
        );
    }
  };

  /* const makeCallDirect = async (phoneToCall) => {
    if (pbxConfig.receive_calls === false || pbxConfig.secundary === true)
      await checkReq();

    await getDevices(await getMedia({ audio: true }));

    if (phoneToCall) {
      setPhoneBookPhone(phoneToCall);
      setPhoneBookName(phoneToCall);
    }

    if (audio && devices && phoneToCall)
      if (simpleUserRegistered && simpleUserRegistered.isConnected() === true) {
        if (phoneToCall && phoneToCall.length === 10) {
          phoneToCall = "+1" + phoneToCall;
        } else if (phoneToCall && phoneToCall.length === 11) {
          phoneToCall = "+" + phoneToCall;
        }

        if (!simpleUserRegistered.session)
          try {
            simpleUserRegistered.call(
              pbxConfig.callTo_start + phoneToCall + pbxConfig.callTo_domain,
              {},
              inviteOptions
            );
            setInCall(true);
            setPoster("active_call.jpg");

            setSimpleUserOnCall(simpleUserRegistered);
            setCallingStatus("Calling Destination");
          } catch (e) {
            console.error("Error making a call to " + phoneToCall + " !:" + e);
          }
      } else {
        if (phoneToCall)
          try {
            await makeRegister();
            simpleUser.call(
              pbxConfig.callTo_start + phoneToCall + pbxConfig.callTo_domain,
              {},
              inviteOptions
            );
            setInCall(true);
            setPoster("active_call.jpg");

            setSimpleUserOnCall(simpleUser);
            setCallingStatus("Calling Destination");
          } catch (e) {
            console.error(
              "Error registering and making a call to " +
                phoneToCall +
                " !:" +
                e
            );
          }
      }
    else
      console.error(
        "You do not comply with all the requiriments to make this call!"
      );
  };*/

  const makeHandup = () => {
    if (
      (simpleUserOnCall && simpleUserOnCall.session) ||
      simpleUserOnCall?.onCallAnswered
    ) {
      try {
        simpleUserOnCall.hangup();

        addEndDateToCallById(dbCallRecord ? dbCallRecord.id : 0);
        setShowVolumen(false);
      } catch (e) {
        console.error("Error on handup the call: " + e);
      }
    } else {
      addEndDateToCallById(dbCallRecord ? dbCallRecord.id : 0);
      setShowVolumen(false);
    }

    setInCall(false);
    setPoster("");
    setTimer(0);
    setTimerOn(false);
    setSimpleUserOnCall(null);
    stopCallingSound();
    setCallingStatus("");
    setCallPermit(false);
    setCallfromEnter(false);
    setVoiceMail(false);
    setRedial(false);
    setCallReturn(false);
    setCallFromPbxConfig(false);
    setOpenAcceptCall(false);
    setContactData([]);
    setCallflip(true);
    setCallKeypad(false);
    setRecentCall(false);
    setSearchContact(false);
    setSearchContactResult([]);
    setSearchContactText("");
    setSearchContactResult2([]);
    setSearchContactText2("");
    setTransfer(false);
    setShowVolumen(false);
    setShowGetCall(false);
    setAcceptCall(false);

    if (pbxConfig.callToPhone && pbxConfig.callToName && pbxConfig.makeACall) {
      let tmp = {};

      tmp = {
        ...pbxConfig,
        makeACall: false,
        callToPhone: null,
        callToName: null,
      };

      dispatch(updatePbxInfo(tmp));
      closeWindow(false);
    }

    if (pbxConfig.receive_calls === false || pbxConfig.secundary === true)
      unRegister();
  };

  const makeHold = () => {
    if (
      (hold === false && simpleUserOnCall && simpleUserOnCall.session) ||
      (hold === false && simpleUserOnCall.onCallAnswered)
    ) {
      try {
        simpleUserOnCall.hold();
        setSimpleUserOnCall(simpleUserOnCall);
        setHold(true);
      } catch (e) {
        console.error(
          "Error making hold to a call with " + phoneBookPhone + " !:" + e
        );
      }
    } else if (
      (hold === true && simpleUserOnCall && simpleUserOnCall.session) ||
      (hold === true && simpleUserOnCall.onCallAnswered)
    ) {
      try {
        simpleUserOnCall.unhold();
        setSimpleUserOnCall(simpleUserOnCall);
        setHold(false);
      } catch (e) {
        console.error(
          "Error making un-hold to a call with " + phoneBookPhone + " !:" + e
        );
      }
    } else if (simpleUserOnCall && !simpleUserOnCall.session) {
      setSimpleUserOnCall(simpleUserOnCall);
      setHold(false);
    }
  };

  const makeMute = () => {
    if (
      (mute === false && simpleUserOnCall && simpleUserOnCall.session) ||
      (mute === false && simpleUserOnCall.onCallAnswered)
    ) {
      try {
        simpleUserOnCall.mute();
        setSimpleUserOnCall(simpleUserOnCall);
        setMute(true);
      } catch (e) {
        console.error(
          "Error making mute to a call with " + phoneBookPhone + " !:" + e
        );
      }
    } else if (
      (mute === true && simpleUserOnCall && simpleUserOnCall.session) ||
      (mute === true && simpleUserOnCall.onCallAnswered)
    ) {
      try {
        simpleUserOnCall.unmute();
        setSimpleUserOnCall(simpleUserOnCall);
        setMute(false);
      } catch (e) {
        console.error(
          "Error making un-mute to a call with " + phoneBookPhone + " !:" + e
        );
      }
    } else if (simpleUserOnCall && !simpleUserOnCall.session) {
      setSimpleUserOnCall(simpleUserOnCall);
      setMute(false);
    }
  };

  const checkReq = async () => {
    console.error(
      "checkReq -> audio,devices,defaults,callCheck,pbxConfig.devices",
      audio,
      devices,
      defaults,
      callCheck,
      pbxConfig.devices
    );

    if (!audio && !devices) {
      await getDevices(await getMedia({ audio: true }));
    } else if (audio && !devices && !defaults) {
      await getDevices(await getMedia({ audio: true }));
    } else {
      if (!pbxConfig.devices)
        devicesOnRedux(
          devices
            ? devices.filter((device) => {
                return device.deviceId === "default";
              })
            : null,
          audio
        );
    }

    if (
      audio &&
      pbxConfig.defaultsDevices &&
      pbxConfig.defaultsDevices.length > 1 &&
      pbxConfig.callCheckInput &&
      pbxConfig.callCheckOutput &&
      !registered &&
      !pbxConfig.registered &&
      pbxConfig.receive_calls &&
      pbxConfig.receive_active &&
      !pbxConfig.secundary
    )
      await makeRegister();
  };

  useEffect(() => {
    if (pbxConfig.receive_calls === false || pbxConfig.secundary === true)
      checkReq();

    if (newVoiceMails === 0) getCountOfNewVoiceMails();
  }, []);

  useEffect(() => {
    if (simpleUserRegistered && pbxConfig.secundary) {
      //makeCall();
      let localPhoneBookPhone = /*number != "" ? number :*/ phoneBookPhone;

      if (phoneBookPhone.length === 10 && callingFrom == 2) {
        localPhoneBookPhone = "+1" + phoneBookPhone;
      } else if (phoneBookPhone.length === 11 && callingFrom == 2) {
        localPhoneBookPhone = "+" + phoneBookPhone;
      } else if (phoneBookPhone.length === 10 && callingFrom == 1) {
        localPhoneBookPhone = "*444" + phoneBookPhone;
      } else if (phoneBookPhone.length === 11 && callingFrom == 1) {
        localPhoneBookPhone = "*444" + phoneBookPhone.slice(1, 11);
      }

      simpleUserRegistered.call(
        pbxConfig.callTo_start + localPhoneBookPhone + pbxConfig.callTo_domain,
        {},
        inviteOptions
      );
      console.log("simpleUser", simpleUserRegistered);
      setPoster("active_call.jpg");

      setSimpleUserOnCall(simpleUserRegistered);
      setCallingStatus("Calling Destination");
      console.log("Secundary server it is calling!");
    }
  }, [simpleUserRegistered]);

  /* useEffect(() => {
    if (!showIncomingCallConfirmation && callInboundSound)
      callInboundSound.pause();
    if (!showIncomingCallConfirmation && incomingConfirmationDialog) {
      incomingConfirmationDialog.style.display = "none";
      rootElement.click();
    }
    if (showIncomingCallConfirmation && incomingConfirmationDialog)
      incomingConfirmationDialog.style.display = "block";
  }, [showIncomingCallConfirmation]);*/

  useEffect(() => {
    if (!showIncomingCallConfirmation && callInboundSound)
      callInboundSound.pause();
    /*if (!showIncomingCallConfirmation ) {
     
    }
    if (showIncomingCallConfirmation )
    {

    }*/
  }, [showIncomingCallConfirmation]);

  useEffect(() => {
    if (callHistory && showMakeCall) setCallHistoryToView();
  }, [showMakeCall, callHistory]);

  useEffect(() => {
    if (!inCall) addEndDateToCallById(dbCallRecord ? dbCallRecord.id : 0);
    if (!inCall && checkVoiceMails) {
      setCheckVoiceMails(false);
      getCountOfNewVoiceMails();
    }

    if (!inCall) {
      setPoster("");
      setSimpleUserOnCall(null);
      stopCallingSound();
      setCallingStatus("");
      setCallPermit(false);
      setCallfromEnter(false);
      setVoiceMail(false);
      setRedial(false);
      setCallReturn(false);
      setCallFromPbxConfig(false);
      setOpenAcceptCall(false);
      setContactData([]);
      setCallflip(true);
      setCallKeypad(false);
      setRecentCall(false);
      setSearchContact(false);
      setSearchContactResult([]);
      setSearchContactText("");
      setSearchContactResult2([]);
      setSearchContactText2("");
      setTransfer(false);
      setShowVolumen(false);
      setShowGetCall(false);
      setAcceptCall(false);
    }
    if (inCall) {
      setTimerOn(true);
      setTimer(0);
    }
  }, [inCall]);

  /* useEffect(() => {

  }, [timerOn]);*/

  useEffect(() => {
    if (simpleUserIncoming && callerNew) {
      setOpenAcceptCall(true);
    } else {
      setOpenAcceptCall(false);
    }
  }, [simpleUserIncoming, callerNew]);

  useEffect(() => {
    if (makeHistoryCall) {
      setMakeHistoryCall(false);

      if (phoneBookPhone && callPermit) {
        makeCall();
      }
    }

    /* if (voiceMail) {
      if (phoneBookPhone && callPermit) if (phoneBookPhone) makeCall();
      setCheckVoiceMails(true);
    }*/

    /* if (redial) {
      if (phoneBookPhone && callPermit) {
        makeCall();
      }
    }*/

    /* if (callReturn) {
      if (phoneBookPhone && callPermit) if (phoneBookPhone) makeCall();
    }*/

    if (callFromPbxConfig) {
      if (phoneBookPhone && callPermit) if (phoneBookPhone) makeCall();
    }

    if (phoneBookPhone != "") {
      setRedialphone(phoneBookPhone);
    }
  }, [phoneBookPhone]);

  useEffect(() => {
    if (makeHistoryCall2) {
      setMakeHistoryCall2(false);

      if (phoneBookPhone && callingSoundReact && callPermit)
        if (phoneBookPhone)
          // callingSoundReact.play();
          makeCall();
    }
  }, [makeHistoryCall2]);

  useEffect(() => {
    if (pbxConfig.makeACall) {
      setShowMakeCall(true);
    }

    if (
      (!pbxConfig.callCheckMedia ||
        !pbxConfig.callCheckNotification ||
        !pbxConfig.callCheckInput ||
        !pbxConfig.callCheckOutput) &&
      registered
    ) {
      unRegister();
    }

    if (
      pbxConfig.receive_active === false &&
      registered &&
      pbxConfig.receive_calls
    )
      unRegister();
    else if (
      pbxConfig.receive_active === true &&
      !registered &&
      pbxConfig.receive_calls
    ) {
      if (!audio && !devices) checkReq();
      else makeRegister();
    }

    if (pbxConfig.callToPhone && pbxConfig.callToName && pbxConfig.makeACall) {
      setCallFromPbxConfig(true);
      setCallPermit(true);
      setPhoneBookPhone(pbxConfig.callToPhone);
      setPhoneBookName(pbxConfig.callToName);
    }
  }, [pbxConfig]);

  /*End Original code*/

  /*Start New code*/

  //const [searchable, setSearchable] = useState(false);

  const handleKeyDown = async (event) => {
    if (event.keyCode === 13 && !isEmpty(searchContactText)) {
      event.preventDefault();
      setCallflip(false);
      setRecentCall(false);
      await setCallPermit(true);
      await setMakeHistoryCall2(true);
      await setPhoneBookName("Contact");
      await setPhoneBookPhone(searchContactText);
      setCallKeypad(false);
      setTransfer(false);
      setSearchContact(false);
      setCallfromEnter(true);
      makeCall();
    }
  };
  const handleKeyDown2 = (event) => {
    if (event.keyCode === 13) {
      // event.preventDefault();
    }
  };

  const maxSecondKeypad = 12;
  const addNumber = (number) => {
    // setSearchable(true);
    setSearchContactText(searchContactText + number);
    setBackspaceText(false);
  };

  const addNumber2 = (number) => {
    // setSearchable(true);
    setSearchContactText2(searchContactText2 + number);
  };

  const addNumberKeypad = (number) => {
    setKeypadText(keypadText + number);
  };

  const getUserCallHistoryNew = async () => {
    try {
      const params = new URLSearchParams("page=1&limit=20");

      const { data } = await Api.getUserCallHistory2(
        authUser.id,
        `?1=1&${params.toString()}`
      );

      setCallHistoryNew(data.data);
    } catch (e) {
      console.error("Error Getting the Call History!");
    }
  };

  const debouncedSearch = useCallback(
    debounce((newValue) => getContact(newValue), 2500),
    []
  );
  const getContact = async (search) => {
    /* if (searchable) {*/
    if (search && search.length >= 3) {
      setSearchContact(true);
      setRecentCall(false);
      setCallKeypad(false);

      setLoading(true);
      const params = new URLSearchParams([["search", `${search}`]]);

      const { data } = await Api.getSearchContactsMessages(
        authUser.organization_id,
        `?1=1&${params.toString()}`
      );

      let data1 = data.data.map((user) => {
        return {
          id: user.id,
          full_name: user.full_name,
          phone: user.phone,
          fname: user.fname,
          lname: user.lname,
          user: user.user ? user.user : null,
        };
      });
      var regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

      if (isEmpty(data1) && search.match(regex)) {
        data1 = [
          {
            id: -1,
            full_name: search,
            phone: search,
            fname: search,
            lname: search,
            user: null,
          },
        ];
      }

      setSearchContactResult(data1);
      setSearchContactResult2([]);

      setLoading(false);
      setCallPermit(true);
    } else {
      setSearchContactResult([]);
      setSearchContactResult2([]);
    }
    /*}*/
  };

  useInterval(() => {
    if (timerOn) {
      setTimer(1 + timer);
    }
  }, 1000);

  const debouncedSearch2 = useCallback(
    debounce((newValue) => getContact2(newValue), 3000),
    []
  );
  const getContact2 = async (search) => {
    setCallflip(true);
    setSearchContact(true);
    setRecentCall(false);
    setCallKeypad(false);

    if (search && search.length >= 3) {
      setLoading(true);
      const params = new URLSearchParams([["search", `${search}`]]);

      const { data } = await Api.getSearchUsersMessages(
        authUser.organization_id,
        `?1=1&${params.toString()}`
      );

      let data1 = data.data.map((user) => {
        return {
          id: user.id,
          full_name: user.full_name,
          phone: user.phone,
          fname: user.fname,
          lname: user.lname,
          user: user.user ? user.user : null,
          ext: user.ext ? user.ext : "",
        };
      });
      var regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

      if (isEmpty(data1) && search.match(regex)) {
        data1 = [
          {
            id: -1,
            full_name: search,
            phone: search,
            fname: search,
            lname: search,
            user: null,
            ext: "",
          },
        ];
      }

      setSearchContactResult2(data1);
      setSearchContactResult([]);

      setLoading(false);
    } else {
      setSearchContactResult2([]);
      setSearchContactResult([]);
    }
  };

  useEffect(() => {
    getUserCallHistoryNew();
  }, []);

  useEffect(() => {
    setCallPermit(false);
    setSearchContactResult2([]);

    if (reTestNumberAsterix.test(searchContactText)) {
      setCallPermit(true);
      setPhoneBookPhone(searchContactText);
    } else if (
      reTestNumber.test(searchContactText) &&
      searchContactText.length >= 5
    ) {
      setPhoneBookPhone(searchContactText);
      if (!backspaceText) {
        setCallflip(true);
        debouncedSearch(searchContactText);
      }
    } else if (reTestNumber.test(searchContactText)) {
      setCallPermit(true);
      setPhoneBookPhone(searchContactText);
    } else if (searchContactText.length >= 3) {
      setPhoneBookPhone(searchContactText);
      if (!backspaceText) {
        setCallflip(true);
        debouncedSearch(searchContactText);
      }
    } else if (searchContactText == " " || isEmpty(searchContactText)) {
      setCallflip(true);
      setCallKeypad(false);
      setRecentCall(false);
      setSearchContact(false);
      setPhoneBookPhone[""];
      setSearchContactResult([]);
    }
  }, [searchContactText]);

  useEffect(() => {
    setSearchContactResult([]);
    if (reTestNumberAsterix.test(searchContactText2)) {
      setTransferToName(searchContactText2);
      setTransferTo(searchContactText2);
    } else if (
      reTestNumber.test(searchContactText2) &&
      searchContactText2.length >= 6
    ) {
      debouncedSearch2(searchContactText2);
    } else if (reTestNumber.test(searchContactText2)) {
      setTransferToName(searchContactText2);
      setTransferTo(searchContactText2);
    } else if (searchContactText2.length >= 3) {
      debouncedSearch2(searchContactText2);
    } else if (searchContactText2 == " " || isEmpty(searchContactText2)) {
      setCallflip(false);
      setCallKeypad(false);
      setRecentCall(false);
      setSearchContact(false);
      setTransferToName("");
      setTransferTo("");
      setSearchContactResult2([]);
    }
  }, [searchContactText2]);

  useEffect(() => {
    if (showMakeCall) {
      setRecentCall(false);
      setCallflip(true);
      setCallKeypad(false);
      setSearchContact(false);
    }
  }, [showMakeCall]);

  useEffect(() => {
    if (showGetCall) {
      setRecentCall(false);
      setCallflip(false);
      setCallKeypad(false);
      setSearchContact(false);
    }
  }, [showGetCall]);

  /*End New code*/

  return (
    <div>
      {!pbxConfig.registrationError &&
      pbxConfig.callCheckInput &&
      pbxConfig.callCheckOutput &&
      pbxConfig.callCheckMedia ? (
        showMakeCall || showGetCall ? (
          <Draggable>
            <Card
              style={{
                position: "fixed",
                zIndex: 10000,
                // width: 400,
                // height: 400,
                background: "rgb(250 250 250)",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "1px solid #999",
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px",
                top: "15%",
                // left: "50%",
                borderRadius: "15px",
                minHeight: "65%",
                maxHeight: "65%",
                maxWidth: "15%",
                height: "25%",
                width: "15%",
              }}
            >
              <CardHeader
                className={newclass.dialogTitle}
                /* action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }*/
                title={
                  <>
                    <div
                      className={
                        newclass.cursorMove
                      } /* id="draggable-dialog-title"*/
                    >
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={10}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            inline
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexGrow: 1,
                            }}
                          >
                            {inCall ? <TimerIcon fontSize="small" /> : ""}
                            {callflip && !transfer
                              ? "New Call"
                              : transfer
                              ? "Transfering"
                              : inCall
                              ? "  " +
                                new Date(1000 * timer)
                                  .toISOString()
                                  .substr(11, 8)
                              : "Connecting"}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={2}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {" "}
                          <Controls.IconButton
                            style={{ color: "#fff" }}
                            onClick={closeWindow}
                          >
                            <CloseIcon />
                          </Controls.IconButton>
                        </Grid>
                      </Grid>
                    </div>
                    <Box mx={3}>
                      {callflip &&
                      !recentCall &&
                      !transfer &&
                      !callKeypad &&
                      !callFromPbxConfig ? (
                        <TextField
                          id="phone"
                          type="tel"
                          value={searchContactText}
                          placeholder={"Enter a number"}
                          autoFocus
                          InputProps={{
                            disableUnderline: true,
                            classes: { input: newclass.labelColor },
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton fontSize="small">
                                  <BackspaceOutlinedIcon
                                    style={{ color: "#fff" }}
                                    onClick={() => {
                                      setSearchContactText(
                                        searchContactText.slice(0, -1)
                                      );
                                      setBackspaceText(true);
                                    }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          inputProps={{
                            pattern: "^[0-9*#+a-z]+$",
                          }}
                          onChange={(el) => {
                            setBackspaceText(false);
                            setSearchContactText(el.target.value);

                            setSearchContactResult2([]);
                          }}
                          fullWidth
                          onKeyDown={(event) => {
                            handleKeyDown(event);
                          }}
                          onKeyPress={(event) => {
                            if (
                              !reTest.test(event?.key) ||
                              searchContactText.length == maxNumberLocal
                            ) {
                              event.preventDefault();
                            }
                          }}
                        />
                      ) : !callflip &&
                        !recentCall &&
                        transfer &&
                        !callKeypad ? (
                        <TextField
                          id="transfer"
                          type="tel"
                          value={searchContactText2}
                          placeholder={"Enter a number"}
                          autoFocus
                          InputProps={{
                            disableUnderline: true,
                            classes: { input: newclass.labelColor },
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton fontSize="small">
                                  <BackspaceOutlinedIcon
                                    style={{ color: "#fff" }}
                                    onClick={() => {
                                      setSearchContactText2(
                                        searchContactText2.slice(0, -1)
                                      );
                                      //setBackspaceText(true);
                                    }}
                                  />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          inputProps={{
                            pattern: "^[0-9*#+a-z]+$",
                          }}
                          onChange={(el) => {
                            setSearchContactText2(el.target.value);
                          }}
                          fullWidth
                          onKeyDown={(event) => {
                            handleKeyDown2(event);
                          }}
                          onKeyPress={(event) => {
                            if (
                              !reTest.test(event?.key) ||
                              searchContactText2.length == maxSecondKeypad
                            ) {
                              event.preventDefault();
                            }
                          }}
                        />
                      ) : !callflip &&
                        !recentCall &&
                        !transfer &&
                        callKeypad &&
                        !searchContact &&
                        !callFromPbxConfig ? (
                        <TextField
                          id="keypad"
                          type="tel"
                          value={keypadText}
                          placeholder={"Enter a number"}
                          InputProps={{
                            disableUnderline: true,
                            classes: { input: newclass.labelColor },
                          }}
                          inputProps={{
                            pattern: "^[0-9*#+]+$",
                          }}
                          onChange={(el) => setKeypadText(el.target.value)}
                          fullWidth
                          onKeyPress={(event) => {
                            if (
                              !reTest2.test(event?.key) ||
                              keypadText.length == maxSecondKeypad
                            ) {
                              event.preventDefault();
                            }
                          }}
                        />
                      ) : (!callflip && !recentCall && !callKeypad) ||
                        callFromPbxConfig ? (
                        <Typography className={newclass.labelColor}>
                          {phoneBookPhone.length === 10
                            ? "+1" + phoneBookPhone
                            : phoneBookPhone.length === 11
                            ? "+" + phoneBookPhone
                            : phoneBookPhone}
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Box>
                    {(!recentCall && !callflip) || callFromPbxConfig ? (
                      ""
                    ) : transfer ? (
                      <div style={{ display: "flex", position: "relative" }}>
                        <Tooltip
                          title={"Recent Calls"}
                          arrow
                          className={newclass.recentCallStyle}
                        >
                          {
                            <IconButton
                              onClick={() => {
                                setCallPermit(true);
                                setCallflip(false);
                                setRecentCall(false);
                                setShowVolumen(false);
                                setCallKeypad(false);
                                setTransfer(false);
                                setSearchContact(false);
                              }}
                            >
                              <ArrowBackIosRoundedIcon fontSize="small" />
                            </IconButton>
                          }
                        </Tooltip>
                      </div>
                    ) : (
                      !searchContact && (
                        <div style={{ display: "flex", position: "relative" }}>
                          <Tooltip
                            title={"Recent Calls"}
                            arrow
                            className={newclass.recentCallStyle}
                          >
                            {!recentCall && callflip ? (
                              <IconButton
                                onClick={() => {
                                  getUserCallHistoryNew();
                                  setRecentCall(true);
                                  setCallflip(true);
                                }}
                              >
                                <ScheduleIcon fontSize="small" />
                              </IconButton>
                            ) : recentCall && callflip ? (
                              <IconButton
                                onClick={() => {
                                  setRecentCall(false);
                                  setCallflip(true);
                                }}
                              >
                                <DialpadIcon fontSize="small" />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => {
                                  getUserCallHistoryNew();
                                  setRecentCall(true);
                                  setCallflip(true);
                                }}
                              >
                                <ScheduleIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Tooltip>
                        </div>
                      )
                    )}
                  </>
                }

                // subheader="September 14, 2016"
              />
              <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                {callflip &&
                  !recentCall &&
                  !searchContact &&
                  !callFromPbxConfig &&
                  !transfer && (
                    <CardContent>
                      <div
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        <Grid container>
                          <Grid
                            container
                            justifyContent="flex-end"
                            alignItems="center"
                            item
                            xs={3}
                          >
                            {" "}
                            <Typography
                              id="callfrom"
                              style={{
                                color: "rgb(102, 102, 102)",
                                fontSize: "0.75rem",
                                fontWeight: 700,
                                fonFamily: "Lato, Helvetica, Arial, sans-serif",
                                lineHeight: "16px",
                                marginRight: "6px",
                              }}
                            >
                              {"Call from:   "}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={9}
                            container
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <NativeSelect
                              id="demo-customized-select-native"
                              value={callingFrom}
                              onChange={handleChangeCallFrom}
                              input={<BootstrapInput />}
                            >
                              <option value={1}>
                                {"  Main Number: " +
                                  authUser.building.data.phone}
                              </option>
                              <option value={2}>
                                {"  My Number: " + authUser.phone}
                              </option>
                            </NativeSelect>
                          </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("1");
                                  soundReact1.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                {" "}
                                1
                                <div className={newclass.buttonLetters}>
                                  {""}
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("2");
                                  soundReact2.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                2
                                <div className={newclass.buttonLetters}>
                                  ABC
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("3");
                                  soundReact3.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                3
                                <div className={newclass.buttonLetters}>
                                  DEF
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("4");
                                  soundReact4.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                4
                                <div className={newclass.buttonLetters}>
                                  GHI
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("5");
                                  soundReact5.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                5
                                <div className={newclass.buttonLetters}>
                                  JKL
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("6");
                                  soundReact6.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                6
                                <div className={newclass.buttonLetters}>
                                  MNO
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("7");
                                  soundReact7.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                7
                                <div className={newclass.buttonLetters}>
                                  PQRS
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("8");
                                  soundReact8.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                8
                                <div className={newclass.buttonLetters}>
                                  TUV
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("9");
                                  soundReact9.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                9
                                <div className={newclass.buttonLetters}>
                                  WXYZ
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("*");
                                  soundReactStar.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                *<div className={newclass.buttonLetters}> </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("0");
                                  soundReact0.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                0
                                <div className={newclass.buttonLetters}>
                                  {""}
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxNumberLocal) {
                                  addNumber("#");
                                  soundReactHash.play();
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                #{" "}
                                <div className={newclass.buttonLetters}> </div>
                              </div>
                            </IconButton>
                          </Grid>
                        </Grid>
                      </div>
                    </CardContent>
                  )}

                {/*Transfer*/}
                {!callflip && !recentCall && transfer && !callKeypad && (
                  <CardContent>
                    <div
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("1");
                                soundReact1.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              {" "}
                              1
                              <div className={newclass.buttonLetters}>{""}</div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("2");
                                soundReact2.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              2<div className={newclass.buttonLetters}>ABC</div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("3");
                                soundReact3.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              3<div className={newclass.buttonLetters}>DEF</div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("4");
                                soundReact4.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              4<div className={newclass.buttonLetters}>GHI</div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("5");
                                soundReact5.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              5<div className={newclass.buttonLetters}>JKL</div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("6");
                                soundReact6.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              6<div className={newclass.buttonLetters}>MNO</div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("7");
                                soundReact7.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              7
                              <div className={newclass.buttonLetters}>PQRS</div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("8");
                                soundReact8.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              8<div className={newclass.buttonLetters}>TUV</div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("9");
                                soundReact9.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              9
                              <div className={newclass.buttonLetters}>WXYZ</div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("*");
                                soundReactStar.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              *<div className={newclass.buttonLetters}> </div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("0");
                                soundReact0.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              0
                              <div className={newclass.buttonLetters}>{""}</div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              if (phoneBookPhone.length <= maxNumberLocal) {
                                addNumber2("#");
                                soundReactHash.play();
                              }
                            }}
                            className={newclass.button}
                          >
                            <div className={newclass.buttonNumber}>
                              # <div className={newclass.buttonLetters}> </div>
                            </div>
                          </IconButton>
                        </Grid>
                      </Grid>
                    </div>

                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={6}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip title="Hide Keypad">
                          <IconButton
                            onClick={() => {
                              setTransfer(false);
                            }}
                            className={newclass.button}
                            style={{
                              color: "#1976d2",
                            }}
                          >
                            <div className={newclass.buttonNumber}>
                              <KeyboardHideIcon
                                fontSize="large"
                                style={{
                                  color: "#1976d2",
                                }}
                              />
                            </div>
                          </IconButton>
                        </Tooltip>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Tooltip title="Transfer">
                          <IconButton
                            onClick={() => {
                              !isEmpty(searchContactText2)
                                ? transferCallAction(searchContactText2)
                                : console.log("Search Text Empty");
                            }}
                            className={newclass.button}
                            style={{
                              color: "#1976d2",
                            }}
                          >
                            <div className={newclass.buttonNumber}>
                              <RedoIcon
                                fontSize="large"
                                style={{
                                  color: "#1976d2",
                                }}
                              />
                            </div>
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>
                )}

                {/*Volumen control */}

                {!callflip &&
                  !recentCall &&
                  !callKeypad &&
                  !transfer &&
                  !searchContact &&
                  !callFromPbxConfig &&
                  showVolumen && (
                    <Box my={"40%"} mx={5}>
                      <Typography id="volume" variant={"h5"}>
                        Volume
                      </Typography>

                      {pbxConfig &&
                      pbxConfig.aor &&
                      pbxConfig.callCheckOutput ? (
                        pbxConfig.defaultsDevices.find((device) => {
                          return device.kind === "audiooutput";
                        }) ? (
                          <Typography
                            id="volume"
                            variant={"p"}
                            style={{ fontWeight: 600 }}
                          >
                            {
                              pbxConfig.defaultsDevices.find((device) => {
                                return device.kind === "audiooutput";
                              }).label
                            }
                          </Typography>
                        ) : (
                          "No default device found!"
                        )
                      ) : (
                        "No default device found!"
                      )}
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={2}>
                          <VolumeUp />
                        </Grid>
                        <Grid item item xs={10}>
                          <PrettoSlider
                            valueLabelDisplay="auto"
                            value={typeof volumen === "number" ? volumen : 0}
                            onChange={handleVolumenChange}
                            aria-label="volume"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}

                {/*KeypaD*/}

                {!callflip &&
                  !recentCall &&
                  callKeypad &&
                  !transfer &&
                  !searchContact &&
                  !callFromPbxConfig && (
                    <CardContent>
                      <div
                        style={{
                          overflow: "hidden",
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("1");
                                  soundReact1.play();
                                  simpleUserOnCall.sendDTMF("1");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                {" "}
                                1
                                <div className={newclass.buttonLetters}>
                                  {""}
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("2");
                                  soundReact2.play();
                                  simpleUserOnCall.sendDTMF("2");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                2
                                <div className={newclass.buttonLetters}>
                                  ABC
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("3");
                                  soundReact3.play();
                                  simpleUserOnCall.sendDTMF("3");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                3
                                <div className={newclass.buttonLetters}>
                                  DEF
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("4");
                                  soundReact4.play();
                                  simpleUserOnCall.sendDTMF("4");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                4
                                <div className={newclass.buttonLetters}>
                                  GHI
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("5");
                                  soundReact5.play();
                                  simpleUserOnCall.sendDTMF("5");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                5
                                <div className={newclass.buttonLetters}>
                                  JKL
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("6");
                                  soundReact6.play();
                                  simpleUserOnCall.sendDTMF("6");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                6
                                <div className={newclass.buttonLetters}>
                                  MNO
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("7");
                                  soundReact7.play();
                                  simpleUserOnCall.sendDTMF("7");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                7
                                <div className={newclass.buttonLetters}>
                                  PQRS
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("8");
                                  soundReact8.play();
                                  simpleUserOnCall.sendDTMF("8");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                8
                                <div className={newclass.buttonLetters}>
                                  TUV
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("9");
                                  soundReact9.play();
                                  simpleUserOnCall.sendDTMF("9");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                9
                                <div className={newclass.buttonLetters}>
                                  WXYZ
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("*");
                                  soundReactStar.play();
                                  simpleUserOnCall.sendDTMF("*");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                *<div className={newclass.buttonLetters}> </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("0");
                                  soundReact0.play();
                                  simpleUserOnCall.sendDTMF("0");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                0
                                <div className={newclass.buttonLetters}>
                                  {""}
                                </div>
                              </div>
                            </IconButton>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <IconButton
                              onClick={() => {
                                if (phoneBookPhone.length <= maxSecondKeypad) {
                                  addNumberKeypad("#");
                                  soundReactHash.play();
                                  simpleUserOnCall.sendDTMF("#");
                                }
                              }}
                              className={newclass.button}
                            >
                              <div className={newclass.buttonNumber}>
                                #{" "}
                                <div className={newclass.buttonLetters}> </div>
                              </div>
                            </IconButton>
                          </Grid>
                        </Grid>
                      </div>

                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        ></Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Tooltip title="Hide Keypad">
                            <IconButton
                              onClick={() => {
                                setCallKeypad(false);
                                setRecentCall(false);
                                setCallflip(false);
                              }}
                              className={newclass.button}
                              style={{
                                color: "#1976d2",
                              }}
                            >
                              <div className={newclass.buttonNumber}>
                                <KeyboardHideIcon
                                  fontSize="large"
                                  style={{
                                    color: "#1976d2",
                                  }}
                                />
                              </div>
                            </IconButton>
                          </Tooltip>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                          }}
                        ></Grid>
                      </Grid>
                    </CardContent>
                  )}
                {/*recentCall*/}
                {callflip &&
                  recentCall &&
                  !transfer &&
                  !callKeypad &&
                  !searchContact &&
                  !callFromPbxConfig && (
                    <CardContent
                      style={{
                        maxHeight: "100%",
                        position: "relative",
                        display: "flex",
                        padding: 0,
                      }}
                    >
                      <List
                        style={{
                          minWidth: "100%",
                          maxHeight: "100%",
                          overflow: "auto",
                          paddingTop: 16,
                        }}
                      >
                        {callHistoryNew.map((item, index) => {
                          return (
                            <ListItem
                              alignItems="flex-start"
                              className={newclass.historyRow}
                              onClick={async () => {
                                setCallflip(false);
                                setRecentCall(false);
                                await setCallPermit(true);

                                // await setMakeHistoryCall(true);

                                await setPhoneBookName(
                                  item.direction === "inbound"
                                    ? item.from
                                    : item.to
                                );
                                await setPhoneBookPhone(
                                  item.direction === "inbound"
                                    ? item.from
                                    : item.to
                                );

                                makeCall(
                                  item.direction === "inbound"
                                    ? item.from
                                    : item.to
                                );
                              }}
                            >
                              <Grid container>
                                <Grid item xs={2}>
                                  {item.direction === "outbound" ? (
                                    <PhoneForwardedOutlinedIcon
                                      style={{ color: green[500] }}
                                    />
                                  ) : item.direction === "inbound" &&
                                    (item.final_state === "voicemail" ||
                                      !item.final_state) ? (
                                    <PhoneMissedIcon
                                      style={{ color: red[500] }}
                                    />
                                  ) : (
                                    <PhoneCallbackOutlinedIcon
                                      style={{ color: blue[500] }}
                                    />
                                  )}
                                </Grid>
                                <Grid item xs={7}>
                                  <Grid container>
                                    <Grid item xs={12}>
                                      {item.direction === "outbound"
                                        ? item.outboundContactFullName
                                          ? item.outboundContactFullName
                                          : "Unknown"
                                        : item.direction === "inbound"
                                        ? item.inboundContactFullName
                                          ? item.inboundContactFullName
                                          : "Unknown"
                                        : ""}
                                    </Grid>
                                    <Grid item xs={12}>
                                      {item.direction === "outbound"
                                        ? item.outboundContactPhone
                                          ? item.outboundContactPhone
                                          : item.to
                                          ? item.to
                                          : ""
                                        : item.direction === "inbound"
                                        ? item.inboundContactPhone
                                          ? item.inboundContactPhone
                                          : item.from
                                          ? item.from
                                          : ""
                                        : ""}
                                    </Grid>
                                  </Grid>
                                </Grid>

                                <Grid item xs={3}>
                                  <Grid container>
                                    <Grid item xs={12}>
                                      {item.created_at
                                        ? moment(item.created_at).format(
                                            "YY-MM-DD"
                                          )
                                        : ""}
                                    </Grid>
                                    <Grid item xs={12}>
                                      {item.created_at
                                        ? moment(item.created_at).format(
                                            "HH:mm:ss"
                                          )
                                        : ""}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </ListItem>
                          );
                        })}
                      </List>
                    </CardContent>
                  )}

                {callflip &&
                  !recentCall &&
                  !callKeypad &&
                  searchContact &&
                  !callFromPbxConfig && (
                    <CardContent
                      style={{
                        maxHeight: "100%",
                        position: "relative",
                        display: "flex",
                        padding: 0,
                      }}
                    >
                      <List
                        style={{
                          minWidth: "100%",
                          maxHeight: "100%",
                          overflow: "auto",
                        }}
                      >
                        {/*!transfer && (
                      <ListItem
                        alignItems="flex-start"
                        className={newclass.historyRow}
                        onClick={async () => {
                          // setCallflip(false);
                          //  setRecentCall(false);
                          //  await setCallPermit(true);
                          // await setMakeHistoryCall(true);
                          // await setPhoneBookName("Contact");
                          // await setPhoneBookPhone(item.phone);
                        }}
                      >
                        <Grid container>
                          <Grid item xs={6}>
                            {"Dial: "}
                          </Grid>
                          <Grid item xs={6}>
                            {searchContactText}
                          </Grid>
                        </Grid>
                      </ListItem>
                    )*/}

                        {!transfer && loading && (
                          <CircularProgress
                            classes={{ root: newclass.spinner }}
                            style={{ color: "#0d47a1" }}
                            size={18}
                          />
                        )}
                        {transfer && loading && (
                          <CircularProgress
                            classes={{ root: newclass.spinner2 }}
                            style={{ color: "#0d47a1" }}
                            size={18}
                          />
                        )}

                        {!transfer && !isEmpty(searchContactResult)
                          ? searchContactResult.map((item, index) => {
                              return (
                                <ListItem
                                  alignItems="flex-start"
                                  className={newclass.historyRow}
                                  onClick={async () => {
                                    setCallflip(false);
                                    setRecentCall(false);
                                    await setCallPermit(true);
                                    await setMakeHistoryCall2(true);
                                    await setPhoneBookName("Contact");
                                    await setPhoneBookPhone(item.phone);
                                    setCallKeypad(false);
                                    setTransfer(false);
                                    setSearchContact(false);
                                  }}
                                >
                                  <Grid container>
                                    <Grid item xs={6}>
                                      {item.full_name}
                                    </Grid>
                                    <Grid item xs={6}>
                                      {item.phone}
                                    </Grid>
                                  </Grid>
                                </ListItem>
                              );
                            })
                          : ""}
                        {transfer && !isEmpty(searchContactResult2)
                          ? searchContactResult2.map((item, index) => {
                              return (
                                <ListItem
                                  alignItems="flex-start"
                                  className={newclass.historyRow}
                                  onClick={async () => {
                                    transferCallAction(item.ext);
                                  }}
                                >
                                  <Grid container>
                                    <Grid item xs={6}>
                                      <Typography variant="p" inline>
                                        {item.full_name}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography variant="p" inline>
                                        {"Ext: "}
                                        {item.ext}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </ListItem>
                              );
                            })
                          : ""}
                      </List>
                    </CardContent>
                  )}
                {/*inCall*/}
                {((((!callflip &&
                  !recentCall &&
                  !showVolumen &&
                  !callKeypad &&
                  !searchContact) ||
                  callFromPbxConfig) &&
                  callPermit) ||
                  callfromEnter) &&
                !transfer ? (
                  <CardContent>
                    <div
                      style={{
                        overflow: "hidden",
                      }}
                    >
                      <Grid container spacing={1}>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",

                            marginTop: "20%",
                          }}
                        >
                          <IconButton
                            onClick={() => makeMute()}
                            className={newclass.buttonSecondScreen}
                            disabled={!inCall}
                          >
                            <div className={newclass.buttonNumber}>
                              <MicIcon
                                style={{
                                  color: !inCall
                                    ? grey[500]
                                    : !mute
                                    ? blue[500]
                                    : teal[500],
                                }}
                              />
                              <div className={newclass.buttonLetters}>
                                {!mute ? "Mute" : "unMute"}
                              </div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            marginTop: "20%",
                          }}
                          disabled
                        >
                          <IconButton
                            onClick={() => {
                              setCallKeypad(true);
                              //console.log("Keypad");
                            }}
                            disabled={!inCall}
                            className={newclass.buttonSecondScreen}
                          >
                            <div className={newclass.buttonNumber}>
                              <DialpadIcon
                                style={{
                                  color: !inCall ? grey[500] : blue[500],
                                }}
                              />
                              <div className={newclass.buttonLetters}>
                                {"Keypad"}
                              </div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            marginTop: "20%",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              console.log("Volumen");
                              changeShowVolume();

                              setCallflip(false);
                              setRecentCall(false);
                              setCallKeypad(false);
                              setTransfer(false);
                              setSearchContact(false);
                              setCallFromPbxConfig(false);
                            }}
                            className={newclass.buttonSecondScreen}
                            disabled={!inCall}
                          >
                            <div className={newclass.buttonNumber}>
                              <VolumeUpIcon
                                style={{
                                  color: !inCall ? grey[500] : blue[500],
                                }}
                              />
                              <div className={newclass.buttonLetters}>
                                {"Volumen"}
                              </div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            marginTop: "20%",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              makeHold();
                            }}
                            className={newclass.buttonSecondScreen}
                            disabled={!inCall}
                          >
                            <div className={newclass.buttonNumber}>
                              <PhonePausedIcon
                                style={{
                                  color: !inCall
                                    ? grey[500]
                                    : !hold
                                    ? blue[500]
                                    : teal[500],
                                }}
                              />
                              <div className={newclass.buttonLetters}>
                                {!hold ? "Hold" : "unHold"}
                              </div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            marginTop: "20%",
                          }}
                          disabled
                        >
                          <IconButton
                            onClick={() => {
                              console.log("Record");
                            }}
                            className={newclass.buttonSecondScreen}
                            disabled //disabled={!inCall}
                          >
                            <div className={newclass.buttonNumber}>
                              <RecordVoiceOverIcon
                                style={{
                                  color:
                                    grey[500] /*!inCall ? grey[500] : blue[500]*/,
                                }}
                              />
                              <div className={newclass.buttonLetters}>
                                {"Record"}
                              </div>
                            </div>
                          </IconButton>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            alignItems: "center",
                            marginTop: "20%",
                          }}
                        >
                          <IconButton
                            onClick={async () => {
                              setTransfer(true);
                              setCallflip(false);
                              setRecentCall(false);
                              setCallKeypad(false);
                            }}
                            className={newclass.buttonSecondScreen}
                            disabled={!inCall || !dbCallRecord}
                          >
                            <div className={newclass.buttonNumber}>
                              <RedoIcon
                                style={{
                                  color: !inCall ? grey[500] : blue[500],
                                }}
                              />
                              <div className={newclass.buttonLetters}>
                                {"Transfer"}
                              </div>
                            </div>
                          </IconButton>
                        </Grid>
                      </Grid>
                    </div>
                  </CardContent>
                ) : (
                  ""
                )}

                <CardActions>
                  {(callflip && recentCall && !callKeypad && !searchContact) ||
                  (callflip && !recentCall && !callKeypad && searchContact) ? (
                    " "
                  ) : (
                    <Grid container spacing={2}>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      ></Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {callflip && !callFromPbxConfig && (
                          <IconButton
                            onClick={async () => {
                              if (!isEmpty(searchContactText)) {
                                setCallflip(false);
                                setRecentCall(false);
                                await setCallPermit(true);
                                await setMakeHistoryCall2(true);
                                await setPhoneBookName("Contact");
                                await setPhoneBookPhone(searchContactText);
                                setCallKeypad(false);
                                setTransfer(false);
                                setSearchContact(false);
                                setCallfromEnter(true);

                                if (phoneBookPhone && callPermit) {
                                  makeCall();
                                }
                              }
                            }}
                            style={{
                              color: green[500],
                            }}
                          >
                            <PhoneIcon
                              fontSize="large"
                              style={{
                                color: green[500],
                              }}
                            />
                          </IconButton>
                        )}
                        {((!callflip || callFromPbxConfig) &&
                          callPermit &&
                          !showVolumen) ||
                        callfromEnter ? (
                          <IconButton
                            onClick={() => {
                              setCallflip(true);
                              setRecentCall(false);
                              setCallKeypad(false);
                              makeHandup();
                            }}
                            style={{
                              color: "#e6423c",
                            }}
                          >
                            <CallEndIcon
                              fontSize="large"
                              style={{
                                color: "#e6423c",
                              }}
                            />
                          </IconButton>
                        ) : (
                          ""
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      ></Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {callflip && !callFromPbxConfig && (
                          <IconButton
                            onClick={async () => {
                              if (!isEmpty(redialphone)) {
                                await setCallflip(false);
                                await setRecentCall(false);
                                await setCallPermit(true);
                                await setRedial(true);
                                await setPhoneBookPhone(redialphone);
                                //console.log(redialphone);
                                makeCall(redialphone);
                              }
                            }}
                            style={{
                              color: "#1976d2",
                            }}
                          >
                            <Tooltip title="Redial">
                              <PhoneInTalkIcon
                                fontSize="large"
                                style={{
                                  color: "#1976d2",
                                }}
                              />
                            </Tooltip>
                          </IconButton>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {callflip && !callFromPbxConfig && (
                          <IconButton
                            onClick={async () => {
                              await setCallflip(false);
                              await setRecentCall(false);
                              await setCallPermit(true);
                              await setVoiceMail(true);
                              await setPhoneBookPhone("*97");
                              makeCall("*97");
                            }}
                            style={{
                              color: "#1976d2",
                            }}
                          >
                            <Tooltip
                              title={"Voice Mail (" + newVoiceMails + ")"}
                            >
                              <VoicemailIcon
                                fontSize="large"
                                style={{
                                  color: "#1976d2",
                                }}
                              />
                            </Tooltip>
                          </IconButton>
                        )}
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {callflip && !callFromPbxConfig && (
                          <IconButton
                            onClick={async () => {
                              await setCallflip(false);
                              await setCallReturn(true);
                              await setCallPermit(true);
                              await setVoiceMail(true);
                              await setPhoneBookPhone("*69");

                              makeCall("*69");
                            }}
                            style={{
                              color: "#1976d2",
                            }}
                          >
                            <Tooltip title="Call Return">
                              <KeyboardReturnIcon
                                fontSize="large"
                                style={{
                                  color: "#1976d2",
                                }}
                              />
                            </Tooltip>
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  )}
                </CardActions>
              </div>
            </Card>
          </Draggable>
        ) : (
          ""
        )
      ) : (
        ""
      )}

      {openAcceptCall ? (
        <Draggable>
          <Card
            style={{
              position: "fixed",
              zIndex: 10000,
              // width: 400,
              // height: 400,
              background: "rgb(250 250 250)",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              border: "1px solid #999",
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px",
              top: "15%",
              // left: "50%",
              borderRadius: "15px",

              maxWidth: "15%",
              minWidth: "20%",
              height: "auto",
            }}
          >
            <CardHeader
              className={newclass.dialogTitle2}
              title={
                <div
                  className={
                    newclass.cursorMove
                  } /* id="draggable-dialog-title"*/
                >
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={12}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">Incoming Call</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6">
                        {!isEmpty(contactData)
                          ? contactData[0].full_name +
                            " (" +
                            contactData[0].phone +
                            ")"
                          : callerNew
                          ? callerNew
                          : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              }
            />
            <CardActions>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={6}
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={async () => {
                      acceptIncomingCall(simpleUserIncoming, callerNew);
                      setOpenAcceptCall(false);
                    }}
                    style={{
                      color: green[500],
                    }}
                  >
                    <PhoneIcon
                      fontSize="large"
                      style={{
                        color: green[500],
                      }}
                    />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={() => {
                      rejectIncomingCall(simpleUserIncoming, callerNew);
                      setOpenAcceptCall(false);
                    }}
                    style={{
                      color: "#e6423c",
                    }}
                  >
                    <CallEndIcon
                      fontSize="large"
                      style={{
                        color: "#e6423c",
                      }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Draggable>
      ) : (
        ""
      )}

      {pbxConfig.registrationError ||
      !pbxConfig.callCheckInput ||
      !pbxConfig.callCheckOutput ||
      !pbxConfig.callCheckMedia ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openAlert}
          onClose={handleCloseAlertM}
          autoHideDuration={6000}
          /*key={vertical + horizontal}*/
        >
          <Alert onClose={handleCloseAlertM} severity="error">
            Error: {alertMessage}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}

      <div>
        {
          <video
            id="localVideo"
            muted="muted"
            //width="320"
            //height="240"
            //poster={"/" + poster}
          ></video>
        }
        <audio id="remoteVideo" ref={audioRef} autoPlay></audio>
        <audio id="incomingCall" src="/call_inbound.mp3" preload="auto"></audio>
        <audio id="calling" src="/calling.mp3" preload="auto"></audio>

        <audio id="0" src="/phone_keys/wav_0.wav" preload="auto"></audio>
        <audio id="1" src="/phone_keys/wav_1.wav" preload="auto"></audio>
        <audio id="2" src="/phone_keys/wav_2.wav" preload="auto"></audio>
        <audio id="3" src="/phone_keys/wav_3.wav" preload="auto"></audio>
        <audio id="4" src="/phone_keys/wav_4.wav" preload="auto"></audio>
        <audio id="5" src="/phone_keys/wav_5.wav" preload="auto"></audio>
        <audio id="6" src="/phone_keys/wav_6.wav" preload="auto"></audio>
        <audio id="7" src="/phone_keys/wav_7.wav" preload="auto"></audio>
        <audio id="8" src="/phone_keys/wav_8.wav" preload="auto"></audio>
        <audio id="9" src="/phone_keys/wav_9.wav" preload="auto"></audio>
        <audio id="star" src="/phone_keys/wav_star.wav" preload="auto"></audio>
        <audio id="hash" src="/phone_keys/wav_hash.wav" preload="auto"></audio>
      </div>
    </div>
  );

  return (
    <div>
      {!pbxConfig.registrationError &&
      pbxConfig.callCheckInput &&
      pbxConfig.callCheckOutput &&
      pbxConfig.callCheckMedia ? (
        <Draggable
          handle={'[class*="MuiDialog-root"]'}
          cancel={'[class*="input"]'}
        >
          <Dialog
            open={showMakeCall || showGetCall}
            //fullWidth
            classes={{ paper: newclass.dialogWrapper }}
            TransitionComponent={Transition}
            PaperComponent={PaperComponent2}
            aria-labelledby="calls"
            hideBackdrop // Disable the backdrop color/image
            disableEnforceFocus // Let the user focus on elements outside the dialog
            disableBackdropClick // Remove the backdrop click (just to be sure)
          >
            <DialogTitle
              // id="draggable-dialog-title"
              className={newclass.dialogTitle}
            >
              <div
                className={newclass.cursorMove} /* id="draggable-dialog-title"*/
              >
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={10}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      inline
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      {inCall ? <TimerIcon fontSize="small" /> : ""}
                      {callflip && !transfer
                        ? "New Call@"
                        : transfer
                        ? "Transfering"
                        : inCall
                        ? "  " +
                          new Date(1000 * timer).toISOString().substr(11, 8)
                        : "Connecting"}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <Controls.IconButton
                      style={{ color: "#fff" }}
                      onClick={closeWindow}
                    >
                      <CloseIcon />
                    </Controls.IconButton>
                  </Grid>
                </Grid>
              </div>
              <Box mx={3}>
                {callflip &&
                !recentCall &&
                !transfer &&
                !callKeypad &&
                !callFromPbxConfig ? (
                  <TextField
                    id="phone"
                    type="tel"
                    value={searchContactText}
                    placeholder={"Enter a number"}
                    autoFocus
                    InputProps={{
                      disableUnderline: true,
                      classes: { input: newclass.labelColor },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton fontSize="small">
                            <BackspaceOutlinedIcon
                              style={{ color: "#fff" }}
                              onClick={() => {
                                setSearchContactText(
                                  searchContactText.slice(0, -1)
                                );
                                setBackspaceText(true);
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      pattern: "^[0-9*#+a-z]+$",
                    }}
                    onChange={(el) => {
                      setBackspaceText(false);
                      setSearchContactText(el.target.value);

                      setSearchContactResult2([]);
                    }}
                    fullWidth
                    onKeyDown={(event) => {
                      handleKeyDown(event);
                    }}
                    onKeyPress={(event) => {
                      if (
                        !reTest.test(event?.key) ||
                        searchContactText.length == maxNumberLocal
                      ) {
                        event.preventDefault();
                      }
                    }}
                  />
                ) : !callflip && !recentCall && transfer && !callKeypad ? (
                  <TextField
                    id="transfer"
                    type="tel"
                    value={searchContactText2}
                    placeholder={"Enter a number"}
                    autoFocus
                    InputProps={{
                      disableUnderline: true,
                      classes: { input: newclass.labelColor },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton fontSize="small">
                            <BackspaceOutlinedIcon
                              style={{ color: "#fff" }}
                              onClick={() => {
                                setSearchContactText2(
                                  searchContactText2.slice(0, -1)
                                );
                                //setBackspaceText(true);
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      pattern: "^[0-9*#+a-z]+$",
                    }}
                    onChange={(el) => {
                      setSearchContactText2(el.target.value);
                    }}
                    fullWidth
                    onKeyDown={(event) => {
                      handleKeyDown2(event);
                    }}
                    onKeyPress={(event) => {
                      if (
                        !reTest.test(event?.key) ||
                        searchContactText2.length == maxSecondKeypad
                      ) {
                        event.preventDefault();
                      }
                    }}
                  />
                ) : !callflip &&
                  !recentCall &&
                  !transfer &&
                  callKeypad &&
                  !searchContact &&
                  !callFromPbxConfig ? (
                  <TextField
                    id="keypad"
                    type="tel"
                    value={keypadText}
                    placeholder={"Enter a number"}
                    InputProps={{
                      disableUnderline: true,
                      classes: { input: newclass.labelColor },
                    }}
                    inputProps={{
                      pattern: "^[0-9*#+]+$",
                    }}
                    onChange={(el) => setKeypadText(el.target.value)}
                    fullWidth
                    onKeyPress={(event) => {
                      if (
                        !reTest2.test(event?.key) ||
                        keypadText.length == maxSecondKeypad
                      ) {
                        event.preventDefault();
                      }
                    }}
                  />
                ) : (!callflip && !recentCall && !callKeypad) ||
                  callFromPbxConfig ? (
                  <Typography className={newclass.labelColor}>
                    {phoneBookPhone.length === 10
                      ? "+1" + phoneBookPhone
                      : phoneBookPhone.length === 11
                      ? "+" + phoneBookPhone
                      : phoneBookPhone}
                  </Typography>
                ) : (
                  ""
                )}
              </Box>
              {(!recentCall && !callflip) || callFromPbxConfig ? (
                ""
              ) : transfer ? (
                <div style={{ display: "flex", position: "relative" }}>
                  <Tooltip
                    title={"Recent Calls"}
                    arrow
                    className={newclass.recentCallStyle}
                  >
                    {
                      <IconButton
                        onClick={() => {
                          setCallPermit(true);
                          setCallflip(false);
                          setRecentCall(false);
                          setShowVolumen(false);
                          setCallKeypad(false);
                          setTransfer(false);
                          setSearchContact(false);
                        }}
                      >
                        <ArrowBackIosRoundedIcon fontSize="small" />
                      </IconButton>
                    }
                  </Tooltip>
                </div>
              ) : (
                <div style={{ display: "flex", position: "relative" }}>
                  <Tooltip
                    title={"Recent Calls"}
                    arrow
                    className={newclass.recentCallStyle}
                  >
                    {!recentCall && callflip ? (
                      <IconButton
                        onClick={() => {
                          setRecentCall(true);
                          setCallflip(true);
                        }}
                      >
                        <ScheduleIcon fontSize="small" />
                      </IconButton>
                    ) : recentCall && callflip ? (
                      <IconButton
                        onClick={() => {
                          setRecentCall(false);
                          setCallflip(true);
                        }}
                      >
                        <DialpadIcon fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          setRecentCall(true);
                          setCallflip(true);
                        }}
                      >
                        <ScheduleIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Tooltip>
                </div>
              )}
            </DialogTitle>
            {callflip &&
              !recentCall &&
              !searchContact &&
              !callFromPbxConfig &&
              !transfer && (
                <DialogContent>
                  <div
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("1");
                              soundReact1.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            {" "}
                            1<div className={newclass.buttonLetters}>{""}</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("2");
                              soundReact2.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            2<div className={newclass.buttonLetters}>ABC</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("3");
                              soundReact3.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            3<div className={newclass.buttonLetters}>DEF</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("4");
                              soundReact4.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            4<div className={newclass.buttonLetters}>GHI</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("5");
                              soundReact5.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            5<div className={newclass.buttonLetters}>JKL</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("6");
                              soundReact6.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            6<div className={newclass.buttonLetters}>MNO</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("7");
                              soundReact7.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            7<div className={newclass.buttonLetters}>PQRS</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("8");
                              soundReact8.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            8<div className={newclass.buttonLetters}>TUV</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("9");
                              soundReact9.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            9<div className={newclass.buttonLetters}>WXYZ</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("*");
                              soundReactStar.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            *<div className={newclass.buttonLetters}> </div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("0");
                              soundReact0.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            0<div className={newclass.buttonLetters}>{""}</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxNumberLocal) {
                              addNumber("#");
                              soundReactHash.play();
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            # <div className={newclass.buttonLetters}> </div>
                          </div>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                </DialogContent>
              )}

            {/*Transfer*/}
            {!callflip && !recentCall && transfer && !callKeypad && (
              <DialogContent>
                <div
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("1");
                            soundReact1.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          {" "}
                          1<div className={newclass.buttonLetters}>{""}</div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("2");
                            soundReact2.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          2<div className={newclass.buttonLetters}>ABC</div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("3");
                            soundReact3.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          3<div className={newclass.buttonLetters}>DEF</div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("4");
                            soundReact4.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          4<div className={newclass.buttonLetters}>GHI</div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("5");
                            soundReact5.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          5<div className={newclass.buttonLetters}>JKL</div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("6");
                            soundReact6.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          6<div className={newclass.buttonLetters}>MNO</div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("7");
                            soundReact7.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          7<div className={newclass.buttonLetters}>PQRS</div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("8");
                            soundReact8.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          8<div className={newclass.buttonLetters}>TUV</div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("9");
                            soundReact9.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          9<div className={newclass.buttonLetters}>WXYZ</div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("*");
                            soundReactStar.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          *<div className={newclass.buttonLetters}> </div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("0");
                            soundReact0.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          0<div className={newclass.buttonLetters}>{""}</div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (phoneBookPhone.length <= maxNumberLocal) {
                            addNumber2("#");
                            soundReactHash.play();
                          }
                        }}
                        className={newclass.button}
                      >
                        <div className={newclass.buttonNumber}>
                          # <div className={newclass.buttonLetters}> </div>
                        </div>
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>

                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={6}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Tooltip title="Hide Keypad">
                      <IconButton
                        onClick={() => {
                          setTransfer(false);
                        }}
                        className={newclass.button}
                        style={{
                          color: "#1976d2",
                        }}
                      >
                        <div className={newclass.buttonNumber}>
                          <KeyboardHideIcon
                            fontSize="large"
                            style={{
                              color: "#1976d2",
                            }}
                          />
                        </div>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Tooltip title="Transfer">
                      <IconButton
                        onClick={() => {
                          !isEmpty(searchContactText2)
                            ? transferCallAction(searchContactText2)
                            : console.log("Search Text Empty");
                        }}
                        className={newclass.button}
                        style={{
                          color: "#1976d2",
                        }}
                      >
                        <div className={newclass.buttonNumber}>
                          <RedoIcon
                            fontSize="large"
                            style={{
                              color: "#1976d2",
                            }}
                          />
                        </div>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              </DialogContent>
            )}

            {/*Volumen control */}

            {!callflip &&
              !recentCall &&
              !callKeypad &&
              !transfer &&
              !searchContact &&
              !callFromPbxConfig &&
              showVolumen && (
                <Box my={"40%"} mx={5}>
                  <Typography id="volume" variant={"h5"}>
                    Volume
                  </Typography>

                  {pbxConfig && pbxConfig.aor && pbxConfig.callCheckOutput ? (
                    pbxConfig.defaultsDevices.find((device) => {
                      return device.kind === "audiooutput";
                    }) ? (
                      <Typography
                        id="volume"
                        variant={"p"}
                        style={{ fontWeight: 600 }}
                      >
                        {
                          pbxConfig.defaultsDevices.find((device) => {
                            return device.kind === "audiooutput";
                          }).label
                        }
                      </Typography>
                    ) : (
                      "No default device found!"
                    )
                  ) : (
                    "No default device found!"
                  )}
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                      <VolumeUp />
                    </Grid>
                    <Grid item item xs={10}>
                      <PrettoSlider
                        valueLabelDisplay="auto"
                        value={typeof volumen === "number" ? volumen : 0}
                        onChange={handleVolumenChange}
                        aria-label="volume"
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

            {/*KeypaD*/}

            {!callflip &&
              !recentCall &&
              callKeypad &&
              !transfer &&
              !searchContact &&
              !callFromPbxConfig && (
                <DialogContent>
                  <div
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("1");
                              soundReact1.play();
                              simpleUserOnCall.sendDTMF("1");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            {" "}
                            1<div className={newclass.buttonLetters}>{""}</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("2");
                              soundReact2.play();
                              simpleUserOnCall.sendDTMF("2");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            2<div className={newclass.buttonLetters}>ABC</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("3");
                              soundReact3.play();
                              simpleUserOnCall.sendDTMF("3");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            3<div className={newclass.buttonLetters}>DEF</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("4");
                              soundReact4.play();
                              simpleUserOnCall.sendDTMF("4");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            4<div className={newclass.buttonLetters}>GHI</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("5");
                              soundReact5.play();
                              simpleUserOnCall.sendDTMF("5");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            5<div className={newclass.buttonLetters}>JKL</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("6");
                              soundReact6.play();
                              simpleUserOnCall.sendDTMF("6");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            6<div className={newclass.buttonLetters}>MNO</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("7");
                              soundReact7.play();
                              simpleUserOnCall.sendDTMF("7");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            7<div className={newclass.buttonLetters}>PQRS</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("8");
                              soundReact8.play();
                              simpleUserOnCall.sendDTMF("8");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            8<div className={newclass.buttonLetters}>TUV</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("9");
                              soundReact9.play();
                              simpleUserOnCall.sendDTMF("9");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            9<div className={newclass.buttonLetters}>WXYZ</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("*");
                              soundReactStar.play();
                              simpleUserOnCall.sendDTMF("*");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            *<div className={newclass.buttonLetters}> </div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("0");
                              soundReact0.play();
                              simpleUserOnCall.sendDTMF("0");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            0<div className={newclass.buttonLetters}>{""}</div>
                          </div>
                        </IconButton>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        style={{
                          justifyContent: "center",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            if (phoneBookPhone.length <= maxSecondKeypad) {
                              addNumberKeypad("#");
                              soundReactHash.play();
                              simpleUserOnCall.sendDTMF("#");
                            }
                          }}
                          className={newclass.button}
                        >
                          <div className={newclass.buttonNumber}>
                            # <div className={newclass.buttonLetters}> </div>
                          </div>
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>

                  <Grid container spacing={1}>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    ></Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Tooltip title="Hide Keypad">
                        <IconButton
                          onClick={() => {
                            setCallKeypad(false);
                            setRecentCall(false);
                            setCallflip(false);
                          }}
                          className={newclass.button}
                          style={{
                            color: "#1976d2",
                          }}
                        >
                          <div className={newclass.buttonNumber}>
                            <KeyboardHideIcon
                              fontSize="large"
                              style={{
                                color: "#1976d2",
                              }}
                            />
                          </div>
                        </IconButton>
                      </Tooltip>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                      }}
                    ></Grid>
                  </Grid>
                </DialogContent>
              )}
            {/*recentCall*/}
            {callflip &&
              recentCall &&
              !transfer &&
              !callKeypad &&
              !searchContact &&
              !callFromPbxConfig && (
                <DialogContent>
                  <List
                    style={{
                      maxHeight: "100%",
                      overflow: "auto",
                    }}
                  >
                    {callHistoryNew.map((item, index) => {
                      return (
                        <ListItem
                          alignItems="flex-start"
                          className={newclass.historyRow}
                          onClick={async () => {
                            setCallflip(false);
                            setRecentCall(false);
                            await setCallPermit(true);
                            await setMakeHistoryCall(true);

                            await setPhoneBookName(
                              item.direction === "inbound" ? item.from : item.to
                            );
                            await setPhoneBookPhone(
                              item.direction === "inbound" ? item.from : item.to
                            );
                          }}
                        >
                          <Grid container>
                            <Grid item xs={7}>
                              {item.direction === "outbound"
                                ? item.to
                                : item.direction === "inbound"
                                ? item.from
                                : ""}
                            </Grid>
                            <Grid item xs={2}>
                              {item.direction === "outbound" ? (
                                <PhoneForwardedOutlinedIcon
                                  style={{ color: green[500] }}
                                />
                              ) : item.direction === "inbound" &&
                                (item.final_state === "voicemail" ||
                                  !item.final_state) ? (
                                <PhoneMissedIcon style={{ color: red[500] }} />
                              ) : (
                                <PhoneCallbackOutlinedIcon
                                  style={{ color: blue[500] }}
                                />
                              )}
                            </Grid>
                            <Grid item xs={3}>
                              {item.start_date
                                ? moment(item.start_date)
                                    .utc()
                                    .format("HH:mm:ss")
                                : ""}
                            </Grid>
                          </Grid>
                        </ListItem>
                      );
                    })}
                  </List>
                </DialogContent>
              )}

            {callflip &&
              !recentCall &&
              !callKeypad &&
              searchContact &&
              !callFromPbxConfig && (
                <DialogContent>
                  <List
                    style={{
                      maxHeight: "100%",
                      overflow: "auto",
                    }}
                  >
                    {/*!transfer && (
                      <ListItem
                        alignItems="flex-start"
                        className={newclass.historyRow}
                        onClick={async () => {
                          // setCallflip(false);
                          //  setRecentCall(false);
                          //  await setCallPermit(true);
                          // await setMakeHistoryCall(true);
                          // await setPhoneBookName("Contact");
                          // await setPhoneBookPhone(item.phone);
                        }}
                      >
                        <Grid container>
                          <Grid item xs={6}>
                            {"Dial: "}
                          </Grid>
                          <Grid item xs={6}>
                            {searchContactText}
                          </Grid>
                        </Grid>
                      </ListItem>
                    )*/}

                    {!transfer && loading && (
                      <CircularProgress
                        classes={{ root: newclass.spinner }}
                        style={{ color: "#0d47a1" }}
                        size={18}
                      />
                    )}
                    {transfer && loading && (
                      <CircularProgress
                        classes={{ root: newclass.spinner2 }}
                        style={{ color: "#0d47a1" }}
                        size={18}
                      />
                    )}

                    {!transfer && !isEmpty(searchContactResult)
                      ? searchContactResult.map((item, index) => {
                          return (
                            <ListItem
                              alignItems="flex-start"
                              className={newclass.historyRow}
                              onClick={async () => {
                                setCallflip(false);
                                setRecentCall(false);
                                await setCallPermit(true);
                                await setMakeHistoryCall2(true);
                                await setPhoneBookName("Contact");
                                await setPhoneBookPhone(item.phone);
                                setCallKeypad(false);
                                setTransfer(false);
                                setSearchContact(false);
                              }}
                            >
                              <Grid container>
                                <Grid item xs={6}>
                                  {item.full_name}
                                </Grid>
                                <Grid item xs={6}>
                                  {item.phone}
                                </Grid>
                              </Grid>
                            </ListItem>
                          );
                        })
                      : ""}
                    {transfer && !isEmpty(searchContactResult2)
                      ? searchContactResult2.map((item, index) => {
                          return (
                            <ListItem
                              alignItems="flex-start"
                              className={newclass.historyRow}
                              onClick={async () => {
                                transferCallAction(item.ext);
                              }}
                            >
                              <Grid container>
                                <Grid item xs={6}>
                                  <Typography variant="p" inline>
                                    {item.full_name}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography variant="p" inline>
                                    {"Ext: "}
                                    {item.ext}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </ListItem>
                          );
                        })
                      : ""}
                  </List>
                </DialogContent>
              )}
            {/*inCall*/}
            {((((!callflip &&
              !recentCall &&
              !showVolumen &&
              !callKeypad &&
              !searchContact) ||
              callFromPbxConfig) &&
              callPermit) ||
              callfromEnter) &&
            !transfer ? (
              <DialogContent>
                <div
                  style={{
                    overflow: "hidden",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",

                        marginTop: "20%",
                      }}
                    >
                      <IconButton
                        onClick={() => makeMute()}
                        className={newclass.buttonSecondScreen}
                        disabled={!inCall}
                      >
                        <div className={newclass.buttonNumber}>
                          <MicIcon
                            style={{
                              color: !inCall
                                ? grey[500]
                                : !mute
                                ? blue[500]
                                : teal[500],
                            }}
                          />
                          <div className={newclass.buttonLetters}>
                            {!mute ? "Mute" : "unMute"}
                          </div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20%",
                      }}
                      disabled
                    >
                      <IconButton
                        onClick={() => {
                          setCallKeypad(true);
                          //console.log("Keypad");
                        }}
                        disabled={!inCall}
                        className={newclass.buttonSecondScreen}
                      >
                        <div className={newclass.buttonNumber}>
                          <DialpadIcon
                            style={{ color: !inCall ? grey[500] : blue[500] }}
                          />
                          <div className={newclass.buttonLetters}>
                            {"Keypad"}
                          </div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20%",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          console.log("Volumen");
                          changeShowVolume();

                          setCallflip(false);
                          setRecentCall(false);
                          setCallKeypad(false);
                          setTransfer(false);
                          setSearchContact(false);
                          setCallFromPbxConfig(false);
                        }}
                        className={newclass.buttonSecondScreen}
                        disabled={!inCall}
                      >
                        <div className={newclass.buttonNumber}>
                          <VolumeUpIcon
                            style={{ color: !inCall ? grey[500] : blue[500] }}
                          />
                          <div className={newclass.buttonLetters}>
                            {"Volumen"}
                          </div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20%",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          makeHold();
                        }}
                        className={newclass.buttonSecondScreen}
                        disabled={!inCall}
                      >
                        <div className={newclass.buttonNumber}>
                          <PhonePausedIcon
                            style={{
                              color: !inCall
                                ? grey[500]
                                : !hold
                                ? blue[500]
                                : teal[500],
                            }}
                          />
                          <div className={newclass.buttonLetters}>
                            {!hold ? "Hold" : "unHold"}
                          </div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20%",
                      }}
                      disabled
                    >
                      <IconButton
                        onClick={() => {
                          console.log("Record");
                        }}
                        className={newclass.buttonSecondScreen}
                        disabled //disabled={!inCall}
                      >
                        <div className={newclass.buttonNumber}>
                          <RecordVoiceOverIcon
                            style={{
                              color:
                                grey[500] /*!inCall ? grey[500] : blue[500]*/,
                            }}
                          />
                          <div className={newclass.buttonLetters}>
                            {"Record"}
                          </div>
                        </div>
                      </IconButton>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "20%",
                      }}
                    >
                      <IconButton
                        onClick={async () => {
                          setTransfer(true);
                          setCallflip(false);
                          setRecentCall(false);
                          setCallKeypad(false);
                        }}
                        className={newclass.buttonSecondScreen}
                        disabled={!inCall || !dbCallRecord}
                      >
                        <div className={newclass.buttonNumber}>
                          <RedoIcon
                            style={{ color: !inCall ? grey[500] : blue[500] }}
                          />
                          <div className={newclass.buttonLetters}>
                            {"Transfer"}
                          </div>
                        </div>
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
              </DialogContent>
            ) : (
              ""
            )}
            <DialogActions>
              {(callflip && recentCall && !callKeypad && !searchContact) ||
              (callflip && !recentCall && !callKeypad && searchContact) ? (
                " "
              ) : (
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={4}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {callflip && !callFromPbxConfig && (
                      <IconButton
                        onClick={async () => {
                          if (!isEmpty(searchContactText)) {
                            setCallflip(false);
                            setRecentCall(false);
                            await setCallPermit(true);
                            await setMakeHistoryCall2(true);
                            await setPhoneBookName("Contact");
                            await setPhoneBookPhone(searchContactText);
                            setCallKeypad(false);
                            setTransfer(false);
                            setSearchContact(false);
                            setCallfromEnter(true);

                            if (phoneBookPhone && callPermit) {
                              makeCall();
                            }
                          }
                        }}
                        style={{
                          color: green[500],
                        }}
                      >
                        <PhoneIcon
                          fontSize="large"
                          style={{
                            color: green[500],
                          }}
                        />
                      </IconButton>
                    )}
                    {((!callflip || callFromPbxConfig) &&
                      callPermit &&
                      !showVolumen) ||
                    callfromEnter ? (
                      <IconButton
                        onClick={() => {
                          setCallflip(true);
                          setRecentCall(false);
                          setCallKeypad(false);
                          makeHandup();
                        }}
                        style={{
                          color: "#e6423c",
                        }}
                      >
                        <CallEndIcon
                          fontSize="large"
                          style={{
                            color: "#e6423c",
                          }}
                        />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  ></Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {callflip && !callFromPbxConfig && (
                      <IconButton
                        onClick={async () => {
                          if (!isEmpty(redialphone)) {
                            await setCallflip(false);
                            await setRecentCall(false);
                            await setCallPermit(true);
                            await setRedial(true);
                            await setPhoneBookPhone(redialphone);
                            //console.log(redialphone);
                            makeCall(redialphone);
                          }
                        }}
                        style={{
                          color: "#1976d2",
                        }}
                      >
                        <Tooltip title="Redial">
                          <PhoneInTalkIcon
                            fontSize="large"
                            style={{
                              color: "#1976d2",
                            }}
                          />
                        </Tooltip>
                      </IconButton>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {callflip && !callFromPbxConfig && (
                      <IconButton
                        onClick={async () => {
                          await setCallflip(false);
                          await setRecentCall(false);
                          await setCallPermit(true);
                          await setVoiceMail(true);
                          await setPhoneBookPhone("*97");
                          makeCall("*97");
                        }}
                        style={{
                          color: "#1976d2",
                        }}
                      >
                        <Tooltip title={"Voice Mail (" + newVoiceMails + ")"}>
                          <VoicemailIcon
                            fontSize="large"
                            style={{
                              color: "#1976d2",
                            }}
                          />
                        </Tooltip>
                      </IconButton>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {callflip && !callFromPbxConfig && (
                      <IconButton
                        onClick={async () => {
                          await setCallflip(false);
                          await setCallReturn(true);
                          await setCallPermit(true);
                          await setVoiceMail(true);
                          await setPhoneBookPhone("*69");

                          makeCall("*69");
                        }}
                        style={{
                          color: "#1976d2",
                        }}
                      >
                        <Tooltip title="Call Return">
                          <KeyboardReturnIcon
                            fontSize="large"
                            style={{
                              color: "#1976d2",
                            }}
                          />
                        </Tooltip>
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              )}
            </DialogActions>
          </Dialog>
        </Draggable>
      ) : (
        ""
      )}
      <Draggable
        handle={'[class*="MuiDialog-root"]'}
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Dialog
          open={openAcceptCall}
          classes={{ paper: newclass.accept }}
          style={{
            zIndex: "2147483647 !important",
            // position: "absolute !important",
            display: "flex !important",
          }}
          disableBackdropClick
          TransitionComponent={Transition}
          PaperComponent={PaperComponent2}
          aria-labelledby="confirm incoming call"
          disableEnforceFocus
          disableScrollLock
          hideBackdrop
        >
          <DialogTitle
            // id="draggable-dialog-title"
            className={newclass.dialogTitle2}
          >
            <div
              className={newclass.cursorMove} /* id="draggable-dialog-title"*/
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">Incoming Call</Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6">
                    {!isEmpty(contactData)
                      ? contactData[0].full_name +
                        " (" +
                        contactData[0].phone +
                        ")"
                      : callerNew
                      ? callerNew
                      : ""}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </DialogTitle>

          <DialogActions>
            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={async () => {
                    acceptIncomingCall(simpleUserIncoming, callerNew);
                    setOpenAcceptCall(false);
                  }}
                  style={{
                    color: green[500],
                  }}
                >
                  <PhoneIcon
                    fontSize="large"
                    style={{
                      color: green[500],
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={() => {
                    rejectIncomingCall(simpleUserIncoming, callerNew);
                    setOpenAcceptCall(false);
                  }}
                  style={{
                    color: "#e6423c",
                  }}
                >
                  <CallEndIcon
                    fontSize="large"
                    style={{
                      color: "#e6423c",
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </Draggable>

      {pbxConfig.registrationError ||
      !pbxConfig.callCheckInput ||
      !pbxConfig.callCheckOutput ||
      !pbxConfig.callCheckMedia ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openAlert}
          onClose={handleCloseAlertM}
          autoHideDuration={6000}
          /*key={vertical + horizontal}*/
        >
          <Alert onClose={handleCloseAlertM} severity="error">
            Error: {alertMessage}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}

      <div>
        {
          <video
            id="localVideo"
            muted="muted"
            //width="320"
            //height="240"
            //poster={"/" + poster}
          ></video>
        }
        <audio id="remoteVideo" ref={audioRef} autoPlay></audio>
        <audio id="incomingCall" src="/call_inbound.mp3" preload="auto"></audio>
        <audio id="calling" src="/calling.mp3" preload="auto"></audio>

        <audio id="0" src="/phone_keys/wav_0.wav" preload="auto"></audio>
        <audio id="1" src="/phone_keys/wav_1.wav" preload="auto"></audio>
        <audio id="2" src="/phone_keys/wav_2.wav" preload="auto"></audio>
        <audio id="3" src="/phone_keys/wav_3.wav" preload="auto"></audio>
        <audio id="4" src="/phone_keys/wav_4.wav" preload="auto"></audio>
        <audio id="5" src="/phone_keys/wav_5.wav" preload="auto"></audio>
        <audio id="6" src="/phone_keys/wav_6.wav" preload="auto"></audio>
        <audio id="7" src="/phone_keys/wav_7.wav" preload="auto"></audio>
        <audio id="8" src="/phone_keys/wav_8.wav" preload="auto"></audio>
        <audio id="9" src="/phone_keys/wav_9.wav" preload="auto"></audio>
        <audio id="star" src="/phone_keys/wav_star.wav" preload="auto"></audio>
        <audio id="hash" src="/phone_keys/wav_hash.wav" preload="auto"></audio>
      </div>
    </div>
  );
}

export default CallGetCallsApp;
