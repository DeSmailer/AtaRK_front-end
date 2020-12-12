import React, { Component } from 'react';
import LogIn from './LogInComponent/LogInComponent';
import Header from './HeaderComponent/HeaderComponent';
import SignUp from './/SignUpComponent/SignUpComponent';
import ClosedWaterSupplyInstallationListByOrganizationId from './ClosedWaterSupplyInstallation/ClosedWaterSupplyInstallationComponent';
import PoolListByOrganizationId from './PoolComponent/PoolListByOrganizationIdComponent';
import PoolListByCWIId from './PoolComponent/PoolListByCWIIdComponent';
import FishListByPoolId from './FishComponent/FishListByPoolIdComponent'
import FishEditForm from './FishComponent/FishEditComponent'
import KindOfFishList from './KindOfFishComponent/KindOfFishListComponent'
import HerdListByPoolId from './HerdComponent/HerdListByPoolIdComponent'
import MilkinhListByFishId from './MilkingComponent/MilkinhListByFishIdComponent'
import PregancyListByFishId from './PregnancyComponent/PregancyListByFishIdComponent'
import ExpectedWeightOfFishInThePoolByCWIId from './PoolComponent/ExpectedWeightOfFishInThePoolByCWIIdComponent'
import FishListForRelocationByPoolId from './FishComponent/FishListForRelocationByPoolIdComponent'
import AddClosedWaterSupplyInstallation from './ClosedWaterSupplyInstallation/AddClosedWaterSupplyInstallationComponent'
import EditClosedWaterSupplyInstallation from './ClosedWaterSupplyInstallation/EditClosedWaterSupplyInstallationComponent'
import AddPoolByCWIId from './PoolComponent/AddPoolByCWIIdComponent'
import EditPoolByCWIId from './PoolComponent/EditPoolByCWIIdComponent'
import FishEdit from './FishComponent/FishEditComponent'
import AddFishComponent from './FishComponent/AddFishComponent'
import OrganizationListAdmin from './OrganizationComponent/OrganizationListAdminComponent'
import ClosedWaterSupplyInstallationListAdmin from './ClosedWaterSupplyInstallation/ClosedWaterSupplyInstallationListAdminComponent'
import PoolListAdmin from './PoolComponent/PoolListAdminComponent'
import FishListAdmin from './FishComponent/FishListAdminComponent'
import HerdListAdmin from './HerdComponent/HerdListAdminComponent'
import MilkingListAdmin from './MilkingComponent/MilkingListAdminComponent'
import PregancyListAdmin from './PregnancyComponent/PregancyListAdminComponent'
import StateOfTheSystemListAdmin from './StateOfTheSystemComponent/StateOfTheSystemListAdminComponent'



import { Switch, Route, Redirect } from 'react-router-dom';
class Main extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <Switch>
                    <Route path="/signUp" component={SignUp}></Route>
                    <Route path="/signIn" component={LogIn}></Route>

                    <Route path="/ClosedWaterSupplyInstallationListByOrganizationId" component={ClosedWaterSupplyInstallationListByOrganizationId}></Route>
                    <Route path="/AddClosedWaterSupplyInstallation" component={AddClosedWaterSupplyInstallation}></Route>
                    <Route path="/EditClosedWaterSupplyInstallation/:closedWaterSupplyInstallationId" component={EditClosedWaterSupplyInstallation}></Route>

                    <Route path="/poolListByCWIId/:closedWaterSupplyInstallationId" component={PoolListByCWIId}></Route>
                    <Route path="/PoolListByOrganizationId" component={PoolListByOrganizationId}></Route>
                    <Route path="/AddPoolByCWIId/:closedWaterSupplyInstallationId" component={AddPoolByCWIId}></Route>
                    <Route path="/EditPoolByCWIId/:poolId" component={EditPoolByCWIId}></Route>
                    
                    <Route path="/FishListByPoolId/:poolId" component={FishListByPoolId}></Route>
                    <Route path="/FishListForRelocationByPoolId/:poolId" component={FishListForRelocationByPoolId}></Route>
                    <Route path="/fishEditForm/:FishId" component={FishEditForm}></Route>
                    <Route path="/FishEdit/:FishId" component={FishEdit}></Route>
                    <Route path="/AddFishComponent/:poolId" component={AddFishComponent}></Route>
                    
                    <Route path="/HerdListByPoolId/:poolId" component={HerdListByPoolId}></Route>
                    
                    <Route path="/KindOfFishList" component={KindOfFishList}></Route>
                    
                    <Route path="/MilkinhListByFishId/:fishId" component={MilkinhListByFishId}></Route>

                    <Route path="/PregancyListByFishId/:fishId" component={PregancyListByFishId}></Route>

                    <Route path="/ExpectedWeightOfFishInThePoolByCWIId/:closedWaterSupplyInstallationId" component={ExpectedWeightOfFishInThePoolByCWIId}></Route>
                    

                    {/* админ */}

                    <Route path="/OrganizationListAdmin" component={OrganizationListAdmin}></Route>

                    <Route path="/ClosedWaterSupplyInstallationListAdmin" component={ClosedWaterSupplyInstallationListAdmin}></Route>

                    <Route path="/PoolListAdmin" component={PoolListAdmin}></Route>

                    <Route path="/FishListAdmin" component={FishListAdmin}></Route>

                    <Route path="/HerdListAdmin" component={HerdListAdmin}></Route>

                    <Route path="/MilkingListAdmin" component={MilkingListAdmin}></Route>

                    <Route path="/PregancyListAdmin" component={PregancyListAdmin}></Route>

                    <Route path="/StateOfTheSystemListAdmin" component={StateOfTheSystemListAdmin}></Route>


                    
                    <Redirect to="/signIn" component={LogIn}></Redirect>
                </Switch>
            </div>
        );
    }
}

export default Main
// export default (connect(mapStateToProps, mapDispatchToProps)(Main));