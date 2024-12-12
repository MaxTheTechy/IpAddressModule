const NodeHelper = require("node_helper"); // Import NodeHelper to extend it
const os = require("os"); // Import os module for fetching network interfaces

module.exports = NodeHelper.create({
  // Start method: Called when the helper is started
  start: function () {
    console.log("Starting node_helper for IpAddressModule...");
  },

  // Method to handle incoming socket notifications
  socketNotificationReceived: function (notification, payload) {
    if (notification === "GET_IP_ADDRESS") {
      const ipAddress = this.getIpAddress(); // Fetch IP address
      this.sendSocketNotification("IP_ADDRESS", ipAddress); // Send IP address back to the frontend
    }
  },

  // Utility function to fetch the IP address
  getIpAddress: function () {
    const interfaces = os.networkInterfaces(); // Get network interfaces
    for (const interfaceName in interfaces) {
      for (const iface of interfaces[interfaceName]) {
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address; // Return the first external IPv4 address
        }
      }
    }
    return "0.0.0.0"; // Default value if no address is found
  }
});
