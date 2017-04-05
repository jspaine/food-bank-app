import angular from 'angular'

export default angular.module('core')
  .component('dynamicView', {
    bindings: {
      dynForm: '=',
      sectionNames: '='
    },
    template: `
      <!-- Dynamic View: Sections -->
      <div ng-repeat="section in $ctrl.dynForm track by $index" class="clearfix">
        <!-- Box -->
        <div class="box box-solid box-primary">
          <!-- Box header -->
          <div class="box-header">
            <h3 class="box-title">SECTION {{$ctrl.sectionNames[$index] | uppercase}}</h3>
          </div> <!-- box-header-->
          <!-- Box body -->
          <div class="box-body">

            <table class="table-striped table-bordered table-hover table">
              <!-- Rows -->
              <tr ng-repeat="row in section track by $index" ng-class="row.header ? 'table-header' : '' ">
                <td ng-repeat="cell in row track by $index">
                  {{cell}}
                </td>
              </tr>
            </table>
          </div> <!-- box-body -->
        </div> <!-- box -->
      </div> <!-- section -->
    `
  })
  .name
