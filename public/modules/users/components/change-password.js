import angular from 'angular'

export default angular.module('users')
  .component('changePassword', {
    controller: 'SettingsController',
    template: `
      <section class="row">
        <h3 class="col-md-12 text-center">Change your password</h3>
        <div class="col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2">
          <form data-ng-submit="$ctrl.changeUserPassword()" class="signin form-horizontal" autocomplete="off">
            <fieldset>
              <div class="form-group">
                <label for="currentPassword">Current Password</label>
                <input type="password" id="currentPassword" name="currentPassword" class="form-control" data-ng-model="$ctrl.passwordDetails.currentPassword" placeholder="Current Password">
              </div>
              <div class="form-group">
                <label for="newPassword">New Password</label>
                <input type="password" id="newPassword" name="newPassword" class="form-control" data-ng-model="$ctrl.passwordDetails.newPassword" placeholder="New Password">
              </div>
              <div class="form-group">
                <label for="verifyPassword">Verify Password</label>
                <input type="password" id="verifyPassword" name="verifyPassword" class="form-control" data-ng-model="$ctrl.passwordDetails.verifyPassword" placeholder="Verify Password">
              </div>
              <div class="text-center form-group">
                <button type="submit" class="btn btn-large btn-primary">Save Password</button>
              </div>
              <div data-ng-show="$ctrl.success" class="text-center text-success">
                <strong>Password Changed Successfully</strong>
              </div>
              <div data-ng-show="$ctrl.error" class="text-center text-danger">
                <strong data-ng-bind="$ctrl.error"></strong>
              </div>
            </fieldset>
          </form>
        </div>
      </section>
    `
  })
  .name
