import React,{PureComponent} from "react";
import {SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";


export default class StatusParamsPage extends PureComponent{

    constructor(props) {
        super(props);
        const params = this.props.route.params;
        this.statusParams = params.paymentStatusInput;
        this.callback= params.callback;
        this.navigation = this.props.navigation
        if(this.navigation){
            this.navigation.setOptions({
                headerShown:false
            })
        }

        this.state={
            privateKey:this.statusParams.privateKey,
            merchantReference:this.statusParams.merchantId,
            reference:this.statusParams.reference,
            currency:this.statusParams.currency
        }
    }


    render() {
        const {privateKey,merchantReference,reference,currency} = this.state
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
                {this.itemView('privateKey:',privateKey,(text)=>{this.setState({privateKey:text})})}
                {this.itemView('merchantReference:',merchantReference,(text)=>{this.setState({merchantReference:text})})}
                {this.itemView('reference:',reference,(text)=>{this.setState({reference:text})})}
                {this.itemView('currency:',currency,(text)=>{this.setState({currency:text})})}
                <View
                    style={{height:64,marginBottom:16}}
                >
                    <TouchableOpacity
                        style={{padding:8,alignItems:'center'}}
                        onPress={()=>{
                            this.statusParams.privateKey = privateKey
                            this.statusParams.merchantReference = merchantReference
                            this.statusParams.reference = reference
                            this.statusParams.currency = currency
                            this.callback(this.statusParams)
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
                value={value}
                onChangeText={(text)=>{
                    onChangeText && onChangeText(text)
                    this.setState({params:this.statusParams})
                }}
                keyboardType={keyboardType}
            />
        </View>
    }
}