import React from 'react';

import {cloneDeep} from 'lodash';

var useDeepCopyFallback=false;

/**
 * 
 * @returns
 */
class DataTools {
    
  /**
   * We need to switch to using the immutable package. That way we
   * avoid really expensive deep copies through bad tricks like the
   * one below. Although it would be nice if we could route the calls
   * through this method so that the signature doesn't change.
   * 
   * @param {any} anObject
   */
  deepCopy (anObject) {
    if(useDeepCopyFallback==true) {
      return (JSON.parse(JSON.stringify(anObject)));
    }

    return (cloneDeep (anObject));
  }

  /**
   * Here we evaluate if aSetTarget represents a subset of the set in aSetSource
   */
  isElement (aSetSource,anElement) {
    console.log ("isElement ()");
    
    for (let i=0;i<aSetSource.length;i++) {
      if (anElement==aSetSource [i]) {
        return (true);
      }
    }

    return (false);
  }  

  /**
   * Here we evaluate if the set in aSetTarget represents a subset of the set in aSetSource
   */
  isSubset (aSourceSet,aSetTarget) {
    console.log ("isSubset ()");

    for (let i=0;i<aSetTarget.length;i++) {
      let aTargetEntry=aSetTarget [i];

      // If one of the elements in aSetTarget isn't in aSetSource then aSetTarget isn't a subset         
      if (this.isElement (aSourceSet,aTargetEntry)==false) {
        return (false);
      }
    }

    return (true);
  }

  /**
   * This method evaluates if the set aSet contains members which constitutes a subset of
   * one of the sets defined in aGroupSet
   */
  isValidSet (aGroupSet,aSet) {
    console.log ("isValidSet ()");

    for (let i=0;i<aGroupSet.length;i++) {
      // find a valid subset, if we find one then the entire premise is true
      if (this.isSubset (aGroupSet [i],aSet)==true) {
        return (true);
      }
    }

    return (false);
  }  
	
  /**
   * 
   */
  generateTableHeader () {
    return ([{
      Header: 'Parameter',
      accessor: 'parameter'
    }, {
      Header: 'Value',
      accessor: 'value'
    }]);  
  }    
    
  /**
   * 
   */
  parameterSetValue (aParameters,aParameter,aValue) {
	  console.log ("parameterSetValue ("+aValue+")");
		
    for (var key in aParameters) {
      if (aParameters.hasOwnProperty(key)) {
         if (key==aParameter) {
           aParameters [aParameter].value=aValue;
         }
      }
    }  
    
    return(aParameters);
  }
  
  /**
   * 
   */
  handleParameterChange (param,event) {
	  console.log ("handleParameterChange("+param+")");
    
    var data = event.target.value;
    
    console.log (param + " => " + data);
  }
	
  /**
   * This is a method that generates a shallow, non-editable version of a
   * parameter list
   */	
  parameterJSONtoArray (anObjectMap) {      
  	var newArray=new Array ();
  	
  	for (var key in anObjectMap) {
      if (anObjectMap.hasOwnProperty(key)) {
        if (key!="dummy") {
    		  var parameterObject=new Object ();
    		  parameterObject.parameter=key;
    		  parameterObject.value=anObjectMap [key];
    		  
    		  newArray.push (parameterObject);
    	  }  
      }
    }
  	
  	return(newArray);
  }
  
  /**
   * 
   */
  parameterArrayToJSON (anArray) {
  	var parameterObject=new Object ();  
  	  
  	for (var i=0;i<anArray.length;i++) {
  	  var testObject=anArray [i];
  	  
  	  if (testObject.path) {
  	    parameterObject [testObject.parameter]=testObject.path;
  	  } else {
  		  parameterObject [testObject.parameter]=testObject.value;
  	  }
  	} 
  	
  	return (parameterObject);
  }
  
  /**
   * 
   */
  jsonToTable (tablejson) {
	  return (this.parameterJSONtoArray (tablejson));
  }

  /**
   *
   */
  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }  

  /**
   *
   */
  deleteElement (anArray,aTarget) {
    for( var i = 0; i < anArray.length; i++) { 
      if (anArray[i] === aTarget) {
        //console.log ("Deleting");
        anArray.splice(i, 1);
        return (anArray);
      }
    }

    return (anArray);
  }

  /**
   *
   */
  popElement (anArray) {
    if (!anArray) {
      return (anArray);
    }

    if (anArray.length==0) {
      return (anArray);
    }
   
    anArray.splice(anArray.length-1, 1);

    return (anArray);
  }

  /**
   * https://www.mattzeunert.com/2016/01/28/javascript-deep-equal.html
   */
  jsonEqual(a,b) {
    return JSON.stringify(a) === JSON.stringify(b);
  }  

  /**
   *
   */
  syntaxHighlight(json) {
    if (typeof json != 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
  }

  /**
   *
   */
   getDateString () {
     var today = new Date();
     var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
     var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
     var dateTime = date+' '+time;

     return (dateTime);
   }

  /**
   *
   */
  capitalizeFLetter (string) { 
    return(string[0].toUpperCase() + string.slice(1));
  }     
}

export default DataTools;
