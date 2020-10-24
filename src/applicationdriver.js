
/**
 *
 */
export default class ApplicationDriver {
 
  /**
   *
   */ 
  constructor (self) {
  	this.driver=self;
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
  addDriver (aDriver) {
  	if (!window.drivers) {
  	  window.drivers=[];	
  	}

  	if (window.drivers!=null) {
      window.drivers.push (aDriver);
    }
  }  
}
