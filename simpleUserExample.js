import { SimpleUser, SimpleUserOptions } from "sip.js/lib/platform/web";
import {
  /*Invitation,
    Inviter,
    InviterOptions,
    Referral,
    Registerer,
    RegistererOptions,
    Session,*/
  SessionState,
  UserAgent,
  /*UserAgentOptions,
    InvitationAcceptOptions,
    Messager,
    SimpleUser, SimpleUserOptions*/
} from "sip.js";
import React, { useState, useEffect, useRef } from "react";
import SelectInput from "@material-ui/core/Select/SelectInput";
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
} from "@material-ui/core";

import AddIcCallIcon from "@material-ui/icons/AddIcCall";

import DialerSipIcon from "@material-ui/icons/DialerSip";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import MicOffIcon from "@material-ui/icons/MicOff";
import PanToolIcon from "@material-ui/icons/PanTool";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CloseIcon from "@material-ui/icons/Close";
//import FactCheckIcon from '@material-ui/icons/FactCheck';
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";

import { useSelector, useDispatch } from "react-redux";
import Popup from "../../components/Popup";
import { updatePbxInfo } from "../../redux/slices/auth";
import Api from "../../lib/api";
import { useForm, Controller } from "react-hook-form";
import Controls from "../controls";

var Push = require("push.js");

import PhoneMissedIcon from "@material-ui/icons/PhoneMissed";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import PhoneDisabledIcon from "@material-ui/icons/PhoneDisabled";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { pbxDomainsSelector } from "../../redux/slices/pbxDomainsSlice";
import PhoneCallbackIcon from "@material-ui/icons/PhoneCallback";
import { on } from "react-use/lib/util";

import ErrorIcon from "@material-ui/icons/Error";
import CallSplitIcon from "@material-ui/icons/CallSplit";
//import MicOffIcon from '@material-ui/icons/MicOff';
import MicNoneIcon from "@material-ui/icons/MicNone";

//import { Root, Popup } from 'react-native-popup-confirm-toast'

import CallMissedIcon from "@material-ui/icons/CallMissed";
import VoicemailIcon from "@material-ui/icons/Voicemail";
import CallIcon from "@material-ui/icons/Call";
import CallEndIcon from "@material-ui/icons/CallEnd";

import CallMadeIcon from "@material-ui/icons/CallMade";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import RedoIcon from "@material-ui/icons/Redo";

import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

import GetAppIcon from "@material-ui/icons/GetApp";

import InfiniteScroll from "react-infinite-scroll-component";

import {
  green,
  red,
  blue,
  grey,
  yellow,
  orange,
  pink,
} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
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
    zIndex: "2147483647", //2147483647 not all browsers, 16777271 all browsers
    position: "absolute",
    display: "flex",
    //display: 'block'
  },
  webPhone: {
    zIndex: "2147483641", //2147483647 not all browsers, 16777271 all browsers
    //position: "absolute",
    //display: 'flex',
    //display: 'block'
  },
}));

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

function GetCallsApp(props /*, context*/) {
  const { active } = props;
  /*if(active === false){
    return (<></>);
  }*/
  const classes = useStyles();
  const { authUser, pbxConfig } = useSelector((state) => state.auth);
  const [registered, setRegistered] = useState(
    localStorage.getItem("registered") === "1" ? true : false
  );
  const [inCall, setInCall] = useState(false);

  const { control } = useForm();

  const dispatch = useDispatch();

  const [hold, setHold] = useState(false);
  const [mute, setMute] = useState(false);
  const [receiving, setReceiving] = useState(false);

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
  //const incomingConfirmationDialog = document.getElementById("confirmationDialog");
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

  const [historyPage, setHistoryPage] = useState(1);

  const [historyEnd, setHistoryEnd] = useState(false);

  const [voiceMail, setVoiceMail] = useState(false);
  const [redial, setRedial] = useState(false);
  const [callReturn, setCallReturn] = useState(false);

  const [callFromPbxConfig, setCallFromPbxConfig] = useState(false);

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

  const getPhoneBookOfUser = async () => {
    try {
      const { data } = await Api.getUserPhoneBook();
      setPhoneBook(data);
    } catch (e) {
      console.error("Error Getting the PhoneBook!");
    }
  };

  const setCallsToView = async (id) => {
    try {
      const { data } = await Api.setViewMissedCall(id);
      //setPhoneBook(data);
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

  console.log("dbCallRecord", dbCallRecord);

  const transferCallTo = async (callId, destination, leg) => {
    try {
      const { data } = await Api.transfer_call_to(callId, destination, leg);
      setDBCallRecord(null);
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

  const [phoneBookName, setPhoneBookName] = useState(null);
  const [phoneBookPhone, setPhoneBookPhone] = useState(null);

  const [message, setMessage] = useState(null);

  const phoneOptions = () => {
    let phones = [];

    phones = phoneBook
      /*.filter((phone) => {
        return phone.type === 1;
      })*/
      .map((phone) => {
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
    //console.error("devicesOnRedux");

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

  const closeWindow = () => {
    setShowGetCall(false);
    setShowMakeCall(false);
    closeMakeACall();

    setVoiceMail(false);
    setRedial(false);
    setCallReturn(false);
    setCallFromPbxConfig(false);

    callInboundSound ? callInboundSound.pause() : "";
    callingSoundReact ? callingSoundReact.pause() : "";

    makeHandup();

    //Api.cleanTemporalRecordingsForUsers();
  };

  /*const syncAllRegisteredForCalls = () => {
    let tmp = {};
    tmp.aor = pbxConfig.aor;
    tmp.server = pbxConfig.server;
    tmp.authorizationUsername = pbxConfig.authorizationUsername;
    tmp.authorizationPassword = pbxConfig.authorizationPassword;
    tmp.callTo_start = pbxConfig.callTo_start;
    tmp.callTo_domain = pbxConfig.callTo_domain;
    tmp.receive_calls = pbxConfig.receive_calls;
    tmp.makeACall = pbxConfig.makeACall ? pbxConfig.makeACall : false;

    tmp.registered = true;

    dispatch(updatePbxInfo(tmp));
  };*/

  /*const syncAllUnRegisteredForCalls = () => {
    let tmp = {};
    tmp.aor = pbxConfig.aor;
    tmp.server = pbxConfig.server;
    tmp.authorizationUsername = pbxConfig.authorizationUsername;
    tmp.authorizationPassword = pbxConfig.authorizationPassword;
    tmp.callTo_start = pbxConfig.callTo_start;
    tmp.callTo_domain = pbxConfig.callTo_domain;
    tmp.receive_calls = pbxConfig.receive_calls;
    tmp.makeACall = pbxConfig.makeACall ? pbxConfig.makeACall : false;

    tmp.registered = false;

    dispatch(updatePbxInfo(tmp));
  };*/

  const audioRef = useRef(null);

  //{server, aor, authorizationPassword, authorizationUsername, callTo} = props;

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
  //const aor = "sip:55555@fusionpbx.hola.com";
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
        //console.log(response.message);
        //console.log("Positive response = " + response);
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
        //console.log("Negative response = " + response);
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

  /*const showIncomingCallNotification = (incoming) => {
    const notification = new Notification("Active Incoming Call!", {
      body: incoming + " it is calling you!",
    });
  };

  const showBusyCallNotification = (incoming) => {
    const notification = new Notification("Active Incoming Call!", {
      body: incoming + " it is calling while you were busy on another call!",
    });
  };*/

  const acceptIncomingCall = async (simpleUser, caller) => {
    console.log("Accept Incoming Call");
    try {
      await simpleUser.answer();
      setInCall(true);
      setShowGetCall(true);
      setSimpleUserOnCall(simpleUser);
      setPoster("active_call.jpg");
      setPhoneBookName(caller ? caller + " (Incoming)" : "Incoming");
      //console.error("answered call session:",simpleUser.session);

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
    //callInboundSound ? callInboundSound.pause() : "";
  };

  const rejectIncomingCall = async (simpleUser, caller) => {
    console.log("Reject Incoming Call");
    callInboundSound ? callInboundSound.pause() : "";
    try {
      await simpleUser.decline();

      await addFinalStateToInboundCall(
        authUser.organization_id,
        pbxConfig.callTo_domain,
        caller,
        pbxConfig.authorizationUsername,
        "rejected"
      );
    } catch (e) {
      console.error("Reject Call from " + caller + " had error:" + e);
    }
  };

  const imcomingDialog = (simpleUser, caller) => {
    console.log("Show Incoming Call dialog");

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div id="confirmationDialog">
            <h1>Take This Call?</h1>
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
            </button>
          </div>
        );
      },
      overlayClassName: classes.confirmDialog,
      /*willUnmount: () => {
        !showIncomingCallConfirmation?true:false
      },*/
      ref: popupRef,
    });

    /*confirmAlert({
      title: "Take This Call?",
      message: "Are you sure to take the call from " + caller + "?",
      buttons: [
        {
          label: "Yes",
          onClick: () => acceptIncomingCall(simpleUser, caller),
          //className='classes.buttonsConfirmation'
        },
        {
          label: "No",
          onClick: () => rejectIncomingCall(simpleUser, caller),
          //className='classes.buttonsConfirmation'
        },
      ],
      
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
          //imcomingDialog(simpleUser, incoming);
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

      let caller = "";
      if (simpleUser.session && simpleUser.session._assertedIdentity) {
        caller =
          simpleUser.session._assertedIdentity.uri.normal.user +
          " (" +
          simpleUser.session._assertedIdentity._displayName +
          ")";

        setPhoneBookPhone(simpleUser.session._assertedIdentity.uri.normal.user);
        setPhoneBookName(simpleUser.session._assertedIdentity._displayName);
      } else if (
        simpleUser.session &&
        simpleUser.session._dialog &&
        simpleUser.session._dialog.dialogState
      ) {
        caller = simpleUser.session._dialog.dialogState.remoteURI.normal.user;

        setPhoneBookPhone(
          simpleUser.session._dialog.dialogState.remoteURI.normal.user
        );
        setPhoneBookName("Incoming No Name");
      }

      //await getMedia({ audio: true });
      await getDevices(await getMedia({ audio: true }));
      callInboundSound ? callInboundSound.play() : "";
      //showIncomingCallNotification(caller);

      if (audio && devices) {
        showNewIncomingCallNotification(caller, simpleUser);
        imcomingDialog(simpleUser, caller);
      } else {
        callInboundSound ? callInboundSound.pause() : "";
        console.error(
          caller + " call was rejected by user or media problems were found!"
        );
        /*alert(
            "You do not comply with all the requiriments to take this call from " +
              caller
          );*/
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

        //callInboundSound.pause();
        setShowIncomingCallConfirmation(false);
        setRedial(false);
        setCallReturn(false);
        setCallFromPbxConfig(false);

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

          //setShowMakeCall(false);

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
    //console.error('stopCallingSound() execute!');
  };

  //console.error(simpleUserOnCall);

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
  //let simpleUser = new SimpleUser(pbxConfig.server, options);

  //setSimpleUser(new SimpleUser(props.server, options));
  /*console.error(
    "New SimpleUser:",
    simpleUser
  );*/

  const getMedia = async (constraints) => {
    let stream = null;

    let result = {};

    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      /* use the stream */
      setAudio(true);
      result.audio = true;
      //mediaOnRedux(true);
    } catch (err) {
      /* handle the error */
      setAudio(false);
      result.audio = false;
      //mediaOnRedux(false);
      //alert("No Audio Available!");
      //setShowGetCall(true);
    }

    try {
      Notification.requestPermission().then((permission) => {
        console.log(permission);
      });
      //notificationOnRedux(true);
      setNotification(true);
      result.notification = true;
    } catch (err) {
      //notificationOnRedux(false);
      result.notification = false;
      console.error("Error getting notification permission!");
    }

    if (
      pbxConfig.receive_calls &&
      !pbxConfig.secundary &&
      pbxConfig.receive_active //&&
      //registered //&&
      //localStorage.getItem("registered")
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

    /*window.addEventListener("onbeforeunload", function (e) {
        e.preventDefault();
        console.error("reloading tab!");

        localStorage.removeItem("registered");
        localStorage.removeItem("devices");
        localStorage.removeItem("defaults");
        localStorage.removeItem("callCheck");

        e.returnValue = "";
      });*/

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
    //}
  };

  const getDevices = async (others) => {
    // List cameras and microphones.

    try {
      let devices = await navigator.mediaDevices.enumerateDevices();
      //let tmp = [];
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

  /*console.error(audio);
  console.error(devices);*/
  //console.error(defaults);

  //console.error(simpleUser);

  const makeRegister = async () => {
    // Construct a SimpleUser instance
    //let simpleUser = new SimpleUser(pbxConfig.server, options);

    console.error(
      "App Register function simpleUser",
      /*audio,
      defaults,*/
      simpleUser /*.registerRequested,
      simpleUser.registerer,
      registered,
      pbxConfig.registered*/
    );
    //await getMedia({ audio: true });
    //await getDevices();
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
        setReceiving(true);
        setSimpleUserRegistered(simpleUser);

        registerOnRedux(true);
        console.error(
          "App Register execute simpleUser",
          /*audio,
          defaults,*/
          simpleUser /*.registerRequested,
          simpleUser.registerer,
          registered,
          pbxConfig.registered*/
        );
      } catch (e) {
        //alert("Error");
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
      //receibingControl();
    }
    /*alert(
        "You do not comply with all the requiriments to make or receive calls on this browser!"
      );*/
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
        setReceiving(false);

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

    //if (simpleUser && simpleUser.isConnected() === true /*&& simpleUser.registerRequested && simpleUser.registerer*/) {
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
    //}
    //}
  };

  const makeCall = async () => {
    //console.error("audio, devices",audio,devices);
    if (pbxConfig.receive_calls === false || pbxConfig.secundary === true)
      await checkReq();
    //await getMedia({ audio: true });
    await getDevices(await getMedia({ audio: true }));
    //console.error("audio, devices",audio,devices);
    if (
      audio &&
      devices &&
      phoneBookPhone
      /*defaults &&
      defaults.length > 1 &&
      callCheck.output === true &&
      callCheck.input === true*/
    )
      if (simpleUserRegistered && simpleUserRegistered.isConnected() === true) {
        if (phoneBookPhone.length === 10) {
          setPhoneBookPhone("+1" + phoneBookPhone);
        } else if (phoneBookPhone.length === 11) {
          setPhoneBookPhone("+" + phoneBookPhone);
        }

        if (!simpleUserRegistered.session)
          try {
            simpleUserRegistered.call(
              pbxConfig.callTo_start + phoneBookPhone + pbxConfig.callTo_domain,
              {},
              inviteOptions
            );
            //setInCall(true);
            setPoster("active_call.jpg");
            //simpleUserRegistered.sendDTMF('1');
            setSimpleUserOnCall(simpleUserRegistered);
            setCallingStatus("Calling Destination");

            /*if(phoneBookName === '*98'){
              simpleUserRegistered.sendDTMF('55555#');
              simpleUserRegistered.sendDTMF('55555#');
            }*/

            //syncAllStateForCalls();
          } catch (e) {
            console.error(
              "Error making a call to " + phoneBookPhone + " !:" + e
            );
          }
      } else {
        //console.error(simpleUser);
        if (phoneBookPhone)
          try {
            await makeRegister();
            simpleUser.call(
              pbxConfig.callTo_start + phoneBookPhone + pbxConfig.callTo_domain,
              {},
              inviteOptions
            );
            //setInCall(true);
            setPoster("active_call.jpg");
            //simpleUserRegistered.sendDTMF('1');
            setSimpleUserOnCall(simpleUser);
            setCallingStatus("Calling Destination");

            /*if(phoneBookName === '*98'){
              simpleUser.sendDTMF('55555#');
              simpleUser.sendDTMF('55555#');
            }*/

            //syncAllStateForCalls();
          } catch (e) {
            console.error(
              "Error registering and making a call to " +
                phoneBookPhone +
                " !:" +
                e
            );
          }
      }
    //alert("You do not comply with all the requiriments to make this call!");
    else
      console.error(
        "You do not comply with all the requiriments to make this call!"
      );
  };

  const makeCallDirect = async (phoneToCall) => {
    //console.error("audio, devices",audio,devices);
    if (pbxConfig.receive_calls === false || pbxConfig.secundary === true)
      await checkReq();
    //await getMedia({ audio: true });
    await getDevices(await getMedia({ audio: true }));
    //console.error("audio, devices",audio,devices);

    if (phoneToCall) {
      setPhoneBookPhone(phoneToCall);
      setPhoneBookName(phoneToCall);
    }

    if (
      audio &&
      devices &&
      phoneToCall
      /*defaults &&
      defaults.length > 1 &&
      callCheck.output === true &&
      callCheck.input === true*/
    )
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
            //simpleUserRegistered.sendDTMF('1');
            setSimpleUserOnCall(simpleUserRegistered);
            setCallingStatus("Calling Destination");

            //syncAllStateForCalls();
          } catch (e) {
            console.error("Error making a call to " + phoneToCall + " !:" + e);
          }
      } else {
        //console.error(simpleUser);
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
            //simpleUserRegistered.sendDTMF('1');
            setSimpleUserOnCall(simpleUser);
            setCallingStatus("Calling Destination");

            //syncAllStateForCalls();
          } catch (e) {
            console.error(
              "Error registering and making a call to " +
                phoneToCall +
                " !:" +
                e
            );
          }
      }
    //alert("You do not comply with all the requiriments to make this call!");
    else
      console.error(
        "You do not comply with all the requiriments to make this call!"
      );
  };

  const makeHandup = () => {
    if (
      (simpleUserOnCall && simpleUserOnCall.session) ||
      simpleUserOnCall?.onCallAnswered
    ) {
      try {
        simpleUserOnCall.hangup();

        setInCall(false);
        setPoster("");
        setSimpleUserOnCall(null);
        stopCallingSound();
        setCallingStatus("");

        setVoiceMail(false);
        setRedial(false);
        setCallReturn(false);
        setCallFromPbxConfig(false);
      } catch (e) {
        console.error("Error on handup the call: " + e);
      }
    } else {
      setInCall(false);
      setPoster("");
      setSimpleUserOnCall(null);
      stopCallingSound();
      setCallingStatus("");

      setVoiceMail(false);
      setRedial(false);
      setCallReturn(false);
      setCallFromPbxConfig(false);
    }
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

      //setShowMakeCall(false);

      dispatch(updatePbxInfo(tmp));
      closeWindow();
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
    /*await getMedia({ audio: true });
    await getDevices();
    getDefaults();*/

    if (!audio && !devices) {
      //await getMedia({ audio: true });
      await getDevices(await getMedia({ audio: true }));
      //getDefaults();
    } else if (audio && !devices && !defaults) {
      await getDevices(await getMedia({ audio: true }));
      //await getDefaults();
    } else {
      if (!pbxConfig.devices)
        devicesOnRedux(
          devices
            ? devices.filter((device) => {
                return device.deviceId === "default";
              })
            : null,
          audio //,
          //others.notification
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

  /*const startProccess = () => {
    console.log("startProccess start", audio, defaults);
    checkReqSync();

    setTimeout(() => {
      checkReqSync();
    }, 2000);

    setTimeout(() => {
      checkReqSync();
    }, 2000);
    console.log("startProccess end", audio, defaults);
  };*/

  useEffect(() => {
    //startProccess();
    if (pbxConfig.receive_calls === false || pbxConfig.secundary === true)
      checkReq();

    if (phoneBook.length === 0) getPhoneBookOfUser();
    if (callHistory.length === 0) getUserCallHistory(1);
  }, []);

  useEffect(() => {
    //if (pbxConfig.secundary === true) checkReq();
    /*if (
      !defaults ||
      (callCheck && callCheck.input === false) ||
      (callCheck && callCheck.output === false)
    )
      checkReq();*/
  }, [audio]);
  useEffect(() => {
    //if (pbxConfig.secundary === true) checkReq();
    /*if (
      !defaults ||
      (callCheck && callCheck.input === false) ||
      (callCheck && callCheck.output === false)
    )
      checkReq();*/
  }, [audio]);

  useEffect(() => {
    if (!showIncomingCallConfirmation && callInboundSound)
      callInboundSound.pause();
    if (!showIncomingCallConfirmation && incomingConfirmationDialog) {
      incomingConfirmationDialog.style.display = "none";
      rootElement.click();
    }
    if (showIncomingCallConfirmation && incomingConfirmationDialog)
      incomingConfirmationDialog.style.display = "block";
  }, [showIncomingCallConfirmation]);

  useEffect(() => {
    if (callHistory && showMakeCall) setCallHistoryToView();
  }, [showMakeCall, callHistory]);

  useEffect(() => {}, [recording, refresh]);

  useEffect(() => {
    console.log("phoneBookPhone", phoneBookPhone);
    if (makeHistoryCall) {
      setMakeHistoryCall(false);

      if (phoneBookPhone && callingSoundReact) callingSoundReact.play();
      if (phoneBookPhone) makeCall();
    }

    if (voiceMail) {
      //setVoiceMail(false);

      if (phoneBookPhone && callingSoundReact) callingSoundReact.play();
      if (phoneBookPhone) makeCall();
    }

    if (redial) {
      //setVoiceMail(false);

      if (phoneBookPhone && callingSoundReact) callingSoundReact.play();
      if (phoneBookPhone) makeCall();
    }

    if (callReturn) {
      //setVoiceMail(false);

      if (phoneBookPhone && callingSoundReact) callingSoundReact.play();
      if (phoneBookPhone) makeCall();
    }

    //if (callFromPbxConfig) {
    //setCallFromPbxConfig(false);

    /*let tmp = {};

      tmp = {
        ...pbxConfig,
        makeACall: false,
        callToPhone: null,
        callToName: null,
      };

      //setShowMakeCall(false);

      dispatch(updatePbxInfo(tmp));*/

    //if (callingSoundReact && callingSoundReact) callingSoundReact.play();
    //if (phoneBookPhone) makeCall();
    //}
  }, [phoneBookPhone /*, makeHistoryCall, voiceMail, redial, callReturn*/]);

  useEffect(() => {
    if (pbxConfig.makeACall) {
      setShowMakeCall(true);
      if (phoneBook.length === 0) getPhoneBookOfUser();
    }

    if (
      pbxConfig.receive_active === false &&
      registered &&
      /*pbxConfig.registered &&*/
      pbxConfig.receive_calls
    )
      unRegister();
    else if (
      pbxConfig.receive_active === true &&
      !registered &&
      /*!pbxConfig.registered &&*/
      pbxConfig.receive_calls
    ) {
      if (!audio && !devices) checkReq();
      else makeRegister();
    } /*else if (
      pbxConfig.receive_active === true &&
      !registered &&
      pbxConfig.secundary
    ) if (!audio && !devices) checkReq();*/

    if (pbxConfig.callToPhone && pbxConfig.callToName && pbxConfig.makeACall) {
      setPhoneBookPhone(pbxConfig.callToPhone);
      setPhoneBookName(pbxConfig.callToName);
      setCallFromPbxConfig(true);

      /*let tmp = {};

      tmp = {
        ...pbxConfig,
        makeACall: false,
        //callToPhone: null,
        //callToName: null,
      };

      //setShowMakeCall(false);

      dispatch(updatePbxInfo(tmp));*/
      //if (!inCall && pbxConfig.makeACall) makeCall();
    }

    /*if(pbxConfig.checkCallReq){
        checkCallReqOnRedux(false);
        checkReq();
    }*/
  }, [pbxConfig]);

  /*useEffect(()=>{
    syncAllStateForCalls();
  }, [registered]);*/
  //console.error("localStorage", localStorage);
  //console.error("localStorage.callCheck", JSON.parse(localStorage.getItem('callCheck')));
  //const regex = new RegExp(/^(\d{10})$/);
  const regex =
    /^(?:\d{10}|\d{2}|[*]\d{1}|[*]\d{2}|[*][*]\d{2}|\d{3}|[*]\d{3}|[*][*]\d{3}|\d{4}|[*]\d{4}|[*][*]\d{4}|\d{5}|[*]\d{5}|[*][*]\d{5}|[*]\d{6}|[*]\d{7}|\d{11})$/;

  const showCallHistory = (result) => {
    return result.map((row) => {
      //console.error(row.Patient_Consultant);
      return (
        <StyledTableRow
          key={row.id}
          /*className={
            row.Contract === "Contract" && row.VIP === 0
              ? classes.rowYes
              : row.VIP === 1
              ? classes.rowVip
              : classes.rowNo
          }*/
        >
          <TableCell>
            {row.direction === "inbound" ? (
              <Tooltip title="Inbound Call (Received Call)">
                <CallReceivedIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Outbound Call (Made Call)">
                <CallMadeIcon />
              </Tooltip>
            )}
          </TableCell>
          {row.view === 0 &&
            (row.final_state === "voicemail" || row.final_state === null) &&
            row.direction === "inbound" && (
              <StyledTableCellMissed>
                {row.direction === "inbound"
                  ? row.from + (row.name ? " (" + row.name + ") " : "")
                  : row.to + (row.name ? " (" + row.name + ") " : "")}
              </StyledTableCellMissed>
            )}
          {(row.view !== 0 ||
            (row.view === 0 &&
              row.final_state !== "voicemail" &&
              row.final_state !== null) ||
            row.direction === "outbound") && (
            <TableCell>
              {row.direction === "inbound"
                ? row.from + (row.name ? " (" + row.name + ") " : "")
                : row.to + (row.name ? " (" + row.name + ") " : "")}
            </TableCell>
          )}
          <TableCell>{row.created_at}</TableCell>

          <TableCell>
            {row.final_state === "answered" ? (
              <Tooltip title="Answered Call">
                <CallIcon />
              </Tooltip>
            ) : row.final_state === "rejected" ? (
              <Tooltip title="Rejected Call">
                <CallEndIcon />
              </Tooltip>
            ) : row.final_state === "voicemail" ? (
              <Tooltip title="Voice Mail">
                <VoicemailIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Missed Call">
                <CallMissedIcon />
              </Tooltip>
            )}
          </TableCell>

          <TableCell>
            {!recording[row.id] && (
              <Controls.Button
                variant="contained"
                startIcon={<RecordVoiceOverIcon />}
                color="secondary"
                disabled={false}
                text={"Get Record"}
                onClick={() => {
                  getRecording(row.pbx_domain, row.pbx_recording, row.id);
                }}
              />
            )}
            {recording[row.id] && recording[row.id] !== "NO_VALID_FILE" && (
              <audio controls autoplay name="media">
                <source
                  src={
                    backendServer
                      .replace("com:8000/api", "com:8000")
                      .replace("com/api", "com") + recording[row.id]
                  }
                  type={"audio/mpeg"}
                ></source>
              </audio>
            )}
            {recording[row.id] && recording[row.id] === "NO_VALID_FILE" && (
              <p>
                <MicOffIcon /> No Record available or Permissions!
              </p>
            )}
          </TableCell>

          <TableCell>
            <Button
              variant="contained"
              color="primary"
              onClick={async () => {
                await setMakeHistoryCall(true);
                await setPhoneBookName(
                  row.direction === "inbound" ? row.from : row.to
                );
                await setPhoneBookPhone(
                  row.direction === "inbound" ? row.from : row.to
                );
                //await setRefresh(row.id);
                /*if (phoneBookPhone)*/ //callingSoundReact.play();
                /*if (phoneBookPhone)*/ //makeCallDirect(row.direction === "inbound" ? row.from : row.to);
              }}
              startIcon={<DialerSipIcon />}
            >
              Call
            </Button>
          </TableCell>
        </StyledTableRow>
      );
    });
  };

  return (
    <>
      {(showGetCall /*||
        (!registered && pbxConfig.receive_active && !pbxConfig.secundary)*/ ||
        showMakeCall) /*|| !defaults*/ && (
        <Popup
          //fullScreen
          title={pbxConfig.makeACall ? "Ready to Call!" : "Incoming Call!"}
          openPopup={true}
          onClose={closeWindow}
        >
          <center>
            <div className={classes.webPhone}>
              <br />
              <h2>
                {pbxConfig.makeACall ? "Doing a Call!" : "Getting a Call!"}

                {pbxConfig.missedCallsCount
                  ? " You have " + pbxConfig.missedCallsCount + " missed calls!"
                  : ""}
                {/*audio*/}
                {/*JSON.stringify(dbCallRecord)*/}
              </h2>
              {/*localStorage.getItem("simpleUserRegistered")*/}
              <Grid container spacing={12}>
                <Grid item xs={12}>
                  {
                    /*!defaults ||
                    defaults.length === 0 ||*/
                    ((callCheck &&
                      callCheck.output &&
                      callCheck.output === false) ||
                      (callCheck &&
                        callCheck.input &&
                        callCheck.input === false)) && (
                      <>
                        <h2>We are preparing your web phone please wait!</h2>
                        <h3>
                          Browser Audio were found, that make impossible to make
                          calls, we need to fixed it first! Please allow
                          permissions when requeste for the sound (media) and/or
                          devices by the browser.
                        </h3>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            checkReq();
                            //receibingControl();
                          }}
                          startIcon={<PlaylistAddCheckIcon />}
                        >
                          Check the Browser Audio and get all permissions
                        </Button>
                      </>
                    )
                  }
                  {!registered &&
                    audio &&
                    defaults &&
                    defaults.length > 1 &&
                    callCheck.output === true &&
                    callCheck.input === true &&
                    pbxConfig.receive_calls === true &&
                    !pbxConfig.secundary && (
                      <>
                        <h3>
                          Browser Audio Available! now you are available to
                          receive calls!
                        </h3>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => makeRegister()}
                          startIcon={<PhoneCallbackIcon />}
                        >
                          Receive Calls
                        </Button>
                      </>
                    )}
                  {registered && !inCall && pbxConfig.receive_calls === false && (
                    <>
                      <h3>Browser Audio Available!</h3>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => unRegister()}
                        startIcon={<CloseIcon />}
                      >
                        Disconect from receiving calls
                      </Button>
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {/*JSON.stringify(phoneBook)*/}

                  {((!inCall &&
                    audio &&
                    /*defaults &&
                    defaults.length > 1 &&*/
                    pbxConfig.makeACall) ||
                    (!inCall &&
                      audio &&
                      pbxConfig.secundary &&
                      pbxConfig.makeACall)) && (
                    <div className={classes.floatHead}>
                      {!callFromPbxConfig && (
                        <Controller
                          name="Phone_Book"
                          control={control}
                          defaultValue=""
                          as={({ onChange }) => (
                            <Controls.Autocomplete
                              value=""
                              label={
                                phoneBookName
                                  ? phoneBookName
                                  : "PhoneBook Record"
                              }
                              options={phoneOptions()}
                              onChange={(value) => {
                                setPhoneBookName(
                                  value ? value.title : "No Contact Selected"
                                );
                                setPhoneBookPhone(value ? value.id : 0);
                              }}
                            />
                          )}
                        />
                      )}

                      <br></br>

                      {!callFromPbxConfig && (
                        <>
                          {!voiceMail && (
                            <Button
                              color="secundary"
                              onClick={() => {
                                setVoiceMail(true);
                                setPhoneBookPhone("*98");
                                setPhoneBookName("VoiceMail");
                              }}
                              startIcon={<VoicemailIcon />}
                            >
                              VoiceMail
                            </Button>
                          )}

                          {!redial && (
                            <Button
                              color="secundary"
                              onClick={() => {
                                setRedial(true);
                                setPhoneBookPhone("*870");
                                setPhoneBookName("Redial");
                              }}
                              startIcon={<RedoIcon />}
                            >
                              Redial
                            </Button>
                          )}

                          {!callReturn && (
                            <Button
                              color="secundary"
                              onClick={() => {
                                setCallReturn(true);
                                setPhoneBookPhone("*69");
                                setPhoneBookName("Call Return");
                              }}
                              startIcon={<KeyboardReturnIcon />}
                            >
                              Call Return
                            </Button>
                          )}
                        </>
                      )}

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          if (phoneBookPhone) callingSoundReact.play();
                          if (phoneBookPhone) makeCall();
                        }}
                        startIcon={<DialerSipIcon />}
                      >
                        Call to {phoneBookName}
                      </Button>

                      {!callFromPbxConfig && (
                        <Controls.Input
                          defaultValue={phoneBookPhone}
                          label="Custom Phone"
                          onChange={(value) => {
                            //console.error("value",value.target.value.toString());
                            //console.error("regex",value.target.value.toString().match(regex));
                            let check = value.target.value
                              .toString()
                              .match(regex);
                            setMessage(
                              check ? null : "Phone Number it is not valid!"
                            );
                            setPhoneBookName(
                              check
                                ? "Custom Number"
                                : "No valid custom phone number"
                            );
                            setPhoneBookPhone(
                              check ? value.target.value : null
                            );
                          }}
                        />
                      )}
                      {message && <h4>{message}</h4>}
                      {!callFromPbxConfig && <h4>User Recent Call History</h4>}

                      {/*<Container>
                      <div>
        
        
        <InfiniteScroll
          dataLength={callHistory.length}
          next={getUserCallHistoryAppend}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {callHistory.map((i, index) => (
            <div key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div>
          </Container>*/}

                      {!callFromPbxConfig && (
                        <>
                          <Table>
                            <TableHead>
                              <StyledTableRowHead>
                                <TableCell>Direction</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Date/Time</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Record</TableCell>
                                <TableCell>Call</TableCell>
                              </StyledTableRowHead>
                            </TableHead>
                            <TableBody>
                              {callHistory && callHistory.length > 0 ? (
                                //showDuplicateContactsInformation(duplicateContacts)
                                showCallHistory(callHistory)
                              ) : (
                                <TableRow>NO DATA TO SHOW</TableRow>
                              )}
                            </TableBody>
                          </Table>
                          {!historyEnd && (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                getUserCallHistoryAppend();
                              }}
                              startIcon={<GetAppIcon />}
                            >
                              More Data
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {inCall && (
                    <>
                      {pbxConfig.registrationError && (
                        <>
                          <h1>
                            <ErrorIcon fontSizeLarge />
                            {"Phone System Error: "}
                          </h1>
                          <h2>
                            <ErrorIcon fontSizeLarge />
                            {pbxConfig.registrationError}
                          </h2>
                          <h3>
                            <ErrorIcon fontSizeLarge />
                            {
                              "Please be sure you are in your phone system building!"
                            }
                          </h3>
                        </>
                      )}
                      <h3>On a Call with {phoneBookName}!</h3>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => makeHandup()}
                        startIcon={<PhoneDisabledIcon />}
                      >
                        HangOut
                      </Button>
                    </>
                  )}

                  {inCall && (
                    <Button
                      onClick={() => makeHold()}
                      startIcon={<PanToolIcon />}
                    >
                      {hold ? "UnHold" : "Hold"}
                    </Button>
                  )}

                  {inCall && (
                    <Button
                      onClick={() => makeMute()}
                      startIcon={<MicNoneIcon />}
                    >
                      {mute ? "UnMute" : "Mute"}
                    </Button>
                  )}

                  {inCall && dbCallRecord && (
                    <>
                      {transferTo && dbCallRecord.pbx_uuid && (
                        <Button
                          onClick={() =>
                            transferCallTo(
                              dbCallRecord.pbx_uuid,
                              transferTo,
                              showGetCall ? "a" : "b"
                            )
                          }
                          startIcon={<CallSplitIcon />}
                        >
                          Transfer to:
                        </Button>
                      )}

                      <Controller
                        name="To:"
                        control={control}
                        defaultValue={transferTo}
                        as={({ onChange }) => (
                          <Controls.Autocomplete
                            value=""
                            label={
                              transferToName
                                ? transferToName
                                : "Transfer to User"
                            }
                            options={phoneOptionsToTransfer()}
                            onChange={(value) => {
                              setTransferTo(value ? value.id : 0);
                              setTransferToName(
                                value ? value.title : "No User Selected"
                              );
                            }}
                          />
                        )}
                      />
                    </>
                  )}

                  {voiceMail && inCall && (
                    <>
                      <br></br>
                      <small>
                        Your ID is {pbxConfig.authorizationUsername + "# "}
                      </small>
                      <br></br>
                      <small>Later your password#</small>
                    </>
                  )}

                  {inCall /*&& voiceMail*/ && (
                    <>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReact1.play();
                                  await simpleUserOnCall.sendDTMF("1");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                1
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReact2.play();
                                  await simpleUserOnCall.sendDTMF("2");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                2
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReact3.play();
                                  await simpleUserOnCall.sendDTMF("3");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                3
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReact4.play();
                                  await simpleUserOnCall.sendDTMF("4");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                4
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReact5.play();
                                  await simpleUserOnCall.sendDTMF("5");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                5
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReact6.play();
                                  await simpleUserOnCall.sendDTMF("6");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                6
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReact7.play();
                                  await simpleUserOnCall.sendDTMF("7");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                7
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReact8.play();
                                  await simpleUserOnCall.sendDTMF("8");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                8
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReact9.play();
                                  await simpleUserOnCall.sendDTMF("9");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                9
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReactStar.play();
                                  await simpleUserOnCall.sendDTMF("*");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                *
                              </Button>
                            </TableCell>

                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReact0.play();
                                  await simpleUserOnCall.sendDTMF("0");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                0
                              </Button>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={async () => {
                                  soundReactHash.play();
                                  await simpleUserOnCall.sendDTMF("#");
                                }}
                                //startIcon={<MicNoneIcon />}
                              >
                                #
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </>
                  )}
                </Grid>
                {inCall && (
                  <Grid item xs={12}>
                    <br></br>
                    <img
                      src="active_call.jpg"
                      alt="VoIp Call"
                      width="300"
                    ></img>
                  </Grid>
                )}
              </Grid>
            </div>
          </center>
        </Popup>
      )}
      <div>
        <video
          id="localVideo"
          muted="muted"
          width="320"
          height="240"
          poster={"/" + poster}
        ></video>
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
    </>
  );
}

export default GetCallsApp;
