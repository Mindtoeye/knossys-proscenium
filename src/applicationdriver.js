
import DataPermanence from './tools/datapermanence';

/**
 *
 */
export default class ApplicationDriver {
 
  /**
   *
   */ 
  constructor (self) {
  	this.driver=self;
  	this.dataPermanence=new DataPermanence ();
  }

  /**
   *
   */
  init () {
    return (null);
  }

  /**
   *
   */
  getPermanenceDriver () {
  	return (this.dataPermanence);
  }

  /**
   *
   */
  addDriver (aDriver) {
  	if (!window.drivers) {
  	  window.drivers=[];	
  	}

  	if (window.drivers!=null) {
      window.drivers.push (aDriver);
    }
  }  
}
