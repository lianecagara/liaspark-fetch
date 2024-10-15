const axios = require("axios");

class LiaSpark {
    // Base URL for the LiaSpark server
    static URL = "https://liaspark.fbbot.org";

    /**
     * Constructor for the LiaSpark class.
     * @param {string} name - The name of the bot. Default is "jea".
     * @param {string} author - The author of the bot. Default is "unregistered".
     */
    constructor(name = "jea", author = "unregistered") {
        this.name = name;
        this.author = author;
    }

    /**
     * Sends a GET request to the LiaSpark server and retrieves the response.
     * @param {object} payload - Parameters to send with the GET request.
     * @returns {Promise<object>} - The server response data.
     */
    async getRes(payload) {
        try {
            const response = await axios.get(`${LiaSpark.URL}/@${this.author}/api/${this.name}`, {
                params: payload,
            });
            return response.data;
        } catch (error) {
            console.error("Error in getRes:", error);
            return `LiaSpark AI "${this.author}@${this.name}" is currently unavailable! Please come back later.`;
        }
    }

    /**
     * Sends a query to the LiaSpark API and retrieves a response message.
     * @param {string} query - The query to send.
     * @param {string} name - Your name.
     * @returns {Promise<string>} - The response message.
     */
    async ask(query, name) {
        const { message } = await this.getRes({ query, name });
        return message;
    }

    /**
     * Retrieves specific information about the AI bot.
     * @returns {Promise<object>} - Mapped AI information for the given author and name.
     */
    async getInfo() {
        try {
            const response = await axios.get(`${LiaSpark.URL}/api/myai`, {
                params: {
                    type: "mapped",
                    c: "only"
                }
            });
            const { data: all } = response;
            return all[`${this.name}@${this.author}`];
        } catch (error) {
            console.error("Error in getInfo:", error);
            throw error;
        }
    }
}

module.exports = LiaSpark;
