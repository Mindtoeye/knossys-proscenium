
var cookieJar={};
var dataSource="COOKIE"; // Choices are COOKIE, OLI, CANVAS
var permanence=null;
var equalCharacter="=";
var iLogosObject=null;

/**
 * Use this class as a middle layer to store data to either network, disk (Electron) or local storage
 * 
 * We switched from using cookies to local storage:
 *
 * The size of a cookie contains entire cookie, including name, value, expiry date etc. A cookie can 
 * contains data upto 4096 Bytes only that is the maximum size of a cookie which can be. If you want 
 * to support most browsers, then do not exceed 50 cookies per domain, and 4093 bytes per domain.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 */
class DataPermanence {
 
  /**
   *
   */ 
  constructor (anObject) {
    console.log ("DataPermanence ()");

    permanence = this;

    if (anObject) {
      iLogosObject = anObject;
    } else {
      console.log ("Error: no data load object provided!");
    }

    permanence.reload ();
  }

  /**
   *
   */
  getDataSource () {
    return (dataSource);
  }

  /**
   *
   */
  reload () {
    //console.log ("reload ()");

    /*
    let allCookies = document.cookie;  
    permanence.parse (allCookies);
    */

    let allCookies = window.localStorage.getItem ("iLogos");  
    if (allCookies!=null) {
      permanence.parse (allCookies);      
    }
  }

  /**
   *
   */ 
  loadSuccess (data) {
    permanence.parse (data);

    if (iLogosObject!=null) {
      iLogosObject.graphLoaded ();
    } else {
      console.log ("Internal error: data load handler not available");
    }
  }

  /**
   *
   */
  loadFail () {
    if (iLogosObject!=null) {
      iLogosObject.graphLoaded ();
    } else {
      console.log ("Internal error: data load handler not available");
    }
  }

  /**
   *
   */
  setValue (aKey,aValue) {
    cookieJar [aKey]=aValue;

    permanence.save ();
  }

  /**
   *
   */
  save () {
    let data="";
    let index=0;

    for (let [key, value] of Object.entries(cookieJar)) {
      let separator=";";
      if (index==0) {
        separator="";
      }

      data=data+separator+key+equalCharacter+value;

      index++;
    }


    //console.log ("Cookie data: " + data);

    //document.cookie = (data+";samesite=strict");
    window.localStorage.setItem ("iLogos",data);

    // Make sure that our internal model is the same as what's on disk
    permanence.reload ();
  }

  /**
   *
   */
  saveSuccess () {
    console.log ("saveSuccess ()");
  }

  /**
   *
   */
  saveFail () {
    console.log ("saveFail ()");
  }

  /**
   *
   */
  parse (data) {
    //console.log ("parse ()");
    let splitter=data.split (";");
     
    cookieJar={};

    for (let i=0;i<splitter.length;i++) {
      let kv=splitter [i].split (equalCharacter);
      if (kv.length>1) {
        cookieJar [kv [0].trim()]=kv [1].trim();
      }
    }
  }

  /**
   *
   */
  getValue (aKey) {
    //console.log ("getValue ("+aKey+")");

    if (cookieJar.hasOwnProperty (aKey)) {
      return (cookieJar [aKey]);
    }

    return ("");
  } 

  /**
   *
   */
  setValueEncoded (aKey,aValue) {
    //console.log ("setValueEncoded ()");
    //console.log (aValue);
    permanence.setValue (aKey,window.btoa(aValue)); 
  }

  /**
   *
   */
  getValueEncoded (aKey) {
    //console.log ("getValueEncoded ()");
    let decoded=permanence.getValue (aKey);
    //console.log (decoded);
    return (window.atob(decoded));
  }   
}

export default DataPermanence;
