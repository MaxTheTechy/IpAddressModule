Module.register("IpAddressModule", {
  // Default module config
  defaults: {},

  // Start method: Called when the module is loaded
  start: function () {
    console.log("Starting IpAddressModule...");
    this.sendSocketNotification("GET_IP_ADDRESS"); // Request IP address from the backend
  },





  // Handle incoming socket notifications
  socketNotificationReceived: function (notification, payload) {
    if (notification === "IP_ADDRESS") {
      console.log("Received IP address: " + payload); // Log the IP address
      this.IpAddress = payload;
      this.updateDom();
      this.displayIpAddress(payload); // Update the DOM
    }
  },

//redone this section
/*
socketNotificationReceived(notification, payload) {
    if (notification === "IP_ADDRESS_RECEIVED") {
        this.ipAddress = payload;
        this.updateDom(); // This should trigger getDom()
    }
}
*/

  // Update the DOM with the IP address
  displayIpAddress: function (ipAddress) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `IP Address: ${IpAddress}`;
    this.updateDom(wrapper);
  },

  // Generate DOM elements
getDom() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `IP Address: ${this.IpAddress || "Loading..."}`;
    return wrapper;
}

});
