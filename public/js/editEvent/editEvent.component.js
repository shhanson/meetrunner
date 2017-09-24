(function () {
  angular.module('meetrunner')
    .component('editEvent', {
      controller: EditEventController,
      templateUrl: '/js/editEvent/editEvent.template.html',
    });

  EditEventController.$inject = ['EventsService', '$stateParams', '$state'];
  function EditEventController(EventsService, $stateParams, $state) {
    const vm = this;
    vm.event = {};
    vm.eventID = $stateParams.event_id;

    vm.$onInit = function onInit() {
      EventsService.getEvent(vm.eventID).then(() => {
        vm.event = EventsService.event;
        vm.event.entry_fee = (vm.event.entry_fee_cents / 100).toFixed(2);
      });
    };

    vm.updateEvent = function updateEvent() {
      vm.event.entry_fee_cents = vm.event.entry_fee * 100;
      EventsService.updateEvent(vm.eventID, vm.event).then(() => {
        vm.event = EventsService.event;
        $state.go('eventReg', { event_id: vm.eventID });
      });
    };
  }
}());
