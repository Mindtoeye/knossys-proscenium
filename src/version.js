/**
*
*/
export default class Version {

  /**
   *
   */
  constructor () {
  	this.major=0;
  	this.minor=5;
  	this.patch=6;
  }

  /**
   *
   */
  toString () {
    return (this.major+"."+this.minor+"."+this.patch);	
  }
}