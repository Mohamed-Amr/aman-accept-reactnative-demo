import React, {Fragment, PureComponent} from "react";
import {SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AmanCountry} from "aman-accept-reactnative-sdk";
import InputScrollView from "react-native-input-scroll-view";


export default class OrderParamsPage extends PureComponent{


    constructor(props) {
        super(props);
        const params = this.props.route.params;
        this.payParams = params.payParams;
        this.callback= params.callback;

        this.navigation = this.props.navigation
        if(this.navigation){
            this.navigation.setOptions({
                headerShown:false
            })
        }
        console.log(JSON.stringify(this.payParams))
        this.state={
            publicKey: this.payParams.publicKey,
            merchantReference: this.payParams.merchantReference,
            amount: String(this.payParams.amount),
            fees: String(this.payParams.fees),
            orderReference: this.payParams.orderReference,
            currency: this.payParams.currency,
            country: this.payParams.country,
            productID: this.payParams.productID,
            productName: this.payParams.productName,
            productPrice: this.payParams.productPrice,
            productQuantity: this.payParams.productQuantity,
            callbackUrl: this.payParams.callbackUrl,
            paymentMethod:this.payParams.paymentMethod,
            expireAt:String(this.payParams.expireAt),
            addressRequired:String(this.payParams.addressRequired),
            customerName: this.payParams.customerName,
            customerPhoneNumber: this.payParams.customerPhoneNumber,
            customerEmailAddress: this.payParams.customerEmailAddress,
            customerAddress: this.payParams.customerAddress,
        }
    }
    render() {
        const {publicKey,merchantReference,amount,fees,orderReference,currency,country,productID,productName,productPrice,productQuantity,callbackUrl,paymentMethod,expireAt,addressRequired,customerName,customerPhoneNumber,customerEmailAddress,customerAddress} = this.state
        return <SafeAreaView
                style={{paddingBottom:16}}
            >
            <View style={{height:44,paddingStart:8,justifyContent:'center',backgroundColor:'#aabbcc'}}>
                <TouchableOpacity
                    onPress={()=>{
                        this.navigation.pop()
                    }}
                >
                    <Text style={{color:'white'}}>Back</Text>
                </TouchableOpacity>

            </View>

            <ScrollView>
                {this.itemView('publicKey:',publicKey,(text)=>{this.setState({publicKey:text})})}
                {this.itemView('merchantReference:',merchantReference,(text)=>{this.setState({merchantReference:text})})}
                {this.itemView('amount:',amount,(text)=>{this.setState({amount:text})},'numeric')}
                {this.itemView('fees:',fees,(text)=>{this.setState({fees:text})},'numeric')}
                {this.itemView('orderReference:',orderReference,(text)=>{this.setState({orderReference:text})})}
                {this.itemView('currency:',currency,(text)=>{this.setState({currency:text})})}
                {this.itemView('country:',country,(text)=>{this.setState({country:text})})}
                {this.itemView('productID:',productID,(text)=>{this.setState({productID:text})})}
                {this.itemView('productName:',productName,(text)=>{this.setState({productName:text})})}
                {this.itemView('productPrice:',productPrice,(text)=>{this.setState({productPrice:text})},'numeric')}
                {this.itemView('productQuantity:',productQuantity,(text)=>{this.setState({productQuantity:text})},'numeric')}
                {this.itemView('callbackUrl:',callbackUrl,(text)=>{this.setState({callbackUrl:text})})}
                {this.itemView('paymentMethod:',paymentMethod,(text)=>{this.setState({paymentMethod:text})})}
                {this.itemView('expireAt:',expireAt,(text)=>{this.setState({expireAt:text})})}
                {this.itemView('addressRequired:',addressRequired,(text)=>{this.setState({addressRequired:text})},'numeric')}
                {this.itemView('customerName:',customerName,(text)=>{this.setState({customerName:text})})}
                {this.itemView('customerPhoneNumber:',customerPhoneNumber,(text)=>{this.setState({customerPhoneNumber:text})})}
                {this.itemView('customerEmailAddress:',customerEmailAddress,(text)=>{this.setState({customerEmailAddress:text})})}
                {this.itemView('customerAddress:',customerAddress,(text)=>{this.setState({customerAddress:text})})}
                <View
                    style={{height:128,marginBottom:16}}
                >
                    <TouchableOpacity
                        style={{padding:8,alignItems:'center'}}
                        onPress={()=>{
                            this.payParams.publicKey=publicKey
                            this.payParams.merchantReference= merchantReference
                            this.payParams.amount=parseFloat(amount).toFixed(2);
                            this.payParams.fees=parseFloat(fees).toFixed(2);
                            this.payParams.orderReference=orderReference
                            this.payParams.currency=currency
                            this.payParams.country=country
                            this.payParams.productID=productID
                            this.payParams.productName=productName
                            this.payParams.productPrice=parseFloat(productPrice).toFixed(2);
                            this.payParams.productQuantity=parseInt(productQuantity)
                            this.payParams.callbackUrl=callbackUrl
                            this.payParams.paymentMethod=paymentMethod
                            this.payParams.expireAt=expireAt
                            this.payParams.addressRequired=parseInt(addressRequired)
                            this.payParams.customerName=customerName
                            this.payParams.customerPhoneNumber=customerPhoneNumber
                            this.payParams.customerEmailAddress=customerEmailAddress
                            this.payParams.customerAddress=customerAddress
                            this.callback(this.payParams)
                            this.navigation.pop()
                        }}
                    >
                        <Text style={{backgroundColor:'#aabbcc',width:128,height:64,textAlign:'center',textAlignVertical:'center'}}>保存</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>

        </SafeAreaView>;
    }


    itemView =(name,value,onChangeText,keyboardType='default')=>{
        return <View style={{flexDirection:'row',alignItems:'center',marginStart:8,marginEnd:32}}>
            <Text>{name}</Text>
            <TextInput
                style={{backgroundColor:'#aaccdd'}}
                defaultValue={value}
                value={value}
                onChangeText={(text)=>{
                    onChangeText && onChangeText(text)
                }}
                keyboardType={keyboardType}
            />
        </View>
    }
}