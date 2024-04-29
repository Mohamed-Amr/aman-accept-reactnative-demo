import React,{PureComponent} from "react";
import {Alert, Button, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {AmanCountry, Aman, AmanWebJsResponse} from "aman-accept-reactnative-sdk";
import {PayResultStatus} from "aman-accept-reactnative-sdk/src/model/PayResultStatus";

export default class HomePage extends PureComponent{

    constructor(props) {
        super(props);
        Aman.isSandBox = true;
        this.state={
            isSandBox:Aman.isSandBox,
            orderResult:'',
            stateResult:''
        }
    }

    payParams = {
        publicKey: "AMANb102852dc3d8a0531d6452f3a64fcd9808d69ad8875088412b131530313d4d4e520a04b97ddcb9475a5f62da0b5d1752e19e7a59facf070f59101abae2b54a5a",
        merchantReference: "170790021118955",
        orderReference: "170790021118955",
        amount: 500.60,
        fees: 11.40,
        currency: AmanCountry.EGYPT.currency,
        country: AmanCountry.EGYPT.countryCode,
        productID: "IVM-13234",
        productName: "iPhone 13 pro max111",
        productPrice: 450.00,
        productQuantity: 1,
        productImage: "",
        callbackUrl: "https://www.google.com",
        paymentMethod:'',
        expireAt:2024-5-31,
        addressRequired: 1,
        customerName: "Ahmed Ali",
        customerPhoneNumber: "01145447890",
        customerEmailAddress: "",
        customerAddress: "",

    }
    paymentStatusInput={
        privateKey:"AMAN3dbdabe4aed15dfc3bce0be080509466892aab792b4eb0d5502c59fc5cc46e30e2a5a13e79fb9c67e7ce8275220db13f10cdff27f27a616d0849e36d88929bca",
        merchantReference:"170790021118955",
        reference:"123",
        currency : AmanCountry.EGYPT.currency
    }

    render(){
        const {isSandBox,orderResult,stateResult}=this.state
        return(
            <SafeAreaView>
                <TouchableOpacity
                    style={{backgroundColor:'#ff0000',height:32,alignItems:'center',justifyContent:'center'}}
                    onPress={()=>{
                        Aman.isSandBox = !isSandBox
                        this.setState({
                            isSandBox:Aman.isSandBox
                        })
                    }}
                >
                    <Text style={{color:'white'}}>{`Change Env (${isSandBox?'sandbox':'release'})`}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{backgroundColor:'#43AAFF',height:32,alignItems:'center',justifyContent:'center',marginTop:16}}
                    onPress={()=>{
                        this.props.navigation.push('orderParams',
                            {
                                payParams:this.payParams,
                                callback:this.payParamsCallback,
                            });
                    }}
                >
                    <Text style={{color:'white'}}>{'Setting OrderParams'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{backgroundColor:'#43E3B7',height:32,alignItems:'center',justifyContent:'center',marginTop:16}}
                    onPress={()=>{
                        this.props.navigation.push('Aman',
                            {
                                payParams:this.payParams,
                                httpCallback:this.orderHttpCallback,
                                webPayCallback:this.orderWebPayCallback,
                            });
                    }}
                >
                    <Text style={{color:'white'}}>{'createOrder'}</Text>
                </TouchableOpacity>

                <Text style={{marginTop:8}}>{orderResult}</Text>

                <TouchableOpacity
                    style={{backgroundColor:'#43AAFF',height:32,alignItems:'center',justifyContent:'center',marginTop:16}}
                    onPress={()=>{
                        this.props.navigation.push('statusParams',
                            {
                                paymentStatusInput:this.paymentStatusInput,
                                callback:this.statusParamsCallback,
                            });
                    }}
                >
                    <Text style={{color:'white'}}>{'Setting Status Params'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{backgroundColor:'#43E3B7',height:32,alignItems:'center',justifyContent:'center',marginTop:16}}
                    onPress={()=>{
                        this.#getCashierStatus()
                    }}
                >
                    <Text style={{color:'white'}}>{'getStatus'}</Text>
                </TouchableOpacity>
                <Text style={{marginTop:8}}>{stateResult}</Text>
            </SafeAreaView>
        );
    }

    /**
     * http callback from order api
     * @param response
     */
    orderHttpCallback=(response)=>{
        this.setState({
            orderResult:JSON.stringify(response)
        })
    }

    /**
     * web callback from pay page than behind order api
     * @param webJsResponse
     */
    orderWebPayCallback=(webJsResponse:AmanWebJsResponse)=>{
        if(webJsResponse!=null){
            let status = webJsResponse.orderStatus;
            console.log(JSON.stringify(webJsResponse))
            switch(status){
                case PayResultStatus.initial:
                    break;
                case PayResultStatus.pending:
                    break;
                case PayResultStatus.success:
                    break;
                case PayResultStatus.fail:
                    break;
                case PayResultStatus.close:
                    break;
            }
        }
    }


    payParamsCallback=(payParams)=>{
        console.log(JSON.stringify(payParams))
        this.payParams = payParams;
    }

    statusParamsCallback=(statusParams)=>{
        console.log(JSON.stringify(statusParams))
        this.paymentStatusInput = statusParams
    }


    #getCashierStatus=()=>{
        new Aman().getCashierStatus(this.paymentStatusInput).then((response)=>{
            console.log(`result=${JSON.stringify(response)}`)
            this.setState({
                stateResult:JSON.stringify(response)
            })
            let status = response.data.status
            switch(status){
                case PayResultStatus.initial:
                    break;
                case PayResultStatus.pending:
                    break;
                case PayResultStatus.success:
                    break;
                case PayResultStatus.fail:
                    break;
                case PayResultStatus.close:
                    break;
            }
        })
    }


}