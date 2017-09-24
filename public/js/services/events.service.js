(function () {
  angular.module('meetrunner')
    .service('EventsService', ['$http', function service($http) {
      const self = this;
      self.events = [];

      self.getEvents = function getEvents() {
        return $http.get('/api/events')
          .then((response) => {
            self.events = response.data;
          });
      };

      self.getSessionlessAthletes = function getSessionlessAthletes(eventID) {
        return $http.get(`/api/events/${eventID}/athletes/sessionless`);
      };

      self.getEvent = function getEvent(eventID) {
        return $http.get(`/api/events/${eventID}`);
      };

      self.postEvent = function postEvent(formData) {
        return $http.post('/api/events/new', formData);
      };

      self.getEventSessions = function getSessions(eventID) {
        return $http.get(`/api/events/${eventID}/sessions`);
      };

      self.postSession = function postSession(eventID, formData) {
        return $http.post(`/api/events/${eventID}/sessions/new`, formData);
      };

      self.addAthleteToSession = function addAthleteToSession(eventID, sessionID, athleteID) {
        return $http.post(`/api/events/${eventID}/sessions/${sessionID}/athletes/${athleteID}/add`);
      };

      self.getAthleteSession = function getAthleteSession(eventID, athleteID) {
        return $http.get(`/api/events/${eventID}/athletes/${athleteID}/session`);
      };
    }]);
}());
