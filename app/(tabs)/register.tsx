import { Button, ScrollView, View, StatusBar, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


export default function Register() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const profile_picture = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [age, setAge] = React.useState('');

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    return (
        <LinearGradient 
            colors={['#310550', '#1A002E', '#002366']} 
            style={{ flex: 1 }}
            >
            <StatusBar barStyle="light-content" />
            <View style={{ flex: 1, paddingTop: insets.top }}> 
                <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Image 
                        source={{ uri: profile_picture }}
                        style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 30 }} 
                    />
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Sign up to filmly.</Text>                  
                </View>
                <View style={{ width: '80%', alignSelf: 'center', marginTop: 50 }}>
                    <TextInput 
                        onChangeText={setEmail}
                        value={email}
                        placeholder="Enter your e-mail."
                        placeholderTextColor="white"
                        autoCapitalize="none"
                        spellCheck={false}
                        style={{
                            width: '100%',
                            height: 50,
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            borderRadius: 8,
                            paddingHorizontal: 15,
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.1)',
                            marginBottom: 15
                        }}
                    />
                    <TextInput 
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Enter your username."
                        placeholderTextColor="white"
                        autoCapitalize="none"
                        spellCheck={false}
                        style={{
                            width: '100%',
                            height: 50,
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            borderRadius: 8,
                            paddingHorizontal: 15,
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.1)',
                            marginBottom: 15
                        }}
                    />
                    <TextInput 
                        onChangeText={setAge}
                        value={age}
                        placeholder="Enter your age."
                        placeholderTextColor="white"
                        autoCapitalize="none"
                        keyboardType="numeric"
                        style={{
                            width: '100%',
                            height: 50,
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            borderRadius: 8,
                            paddingHorizontal: 15,
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.1)',
                            marginBottom: 15
                        }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        marginBottom: 15
                    }}>
                        <TextInput 
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Enter your password."
                            placeholderTextColor="white"
                            secureTextEntry={!isPasswordVisible}
                            autoCapitalize="none"
                            style={{
                                flex: 1, 
                                height: 50,
                                backgroundColor: 'rgba(255,255,255,0.08)',
                                borderRadius: 8,
                                paddingHorizontal: 15,
                                color: 'white',
                                borderColor: 'rgba(255,255,255,0.1)',
                                marginRight: 10
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: 'rgba(255,255,255,0.12)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: 'rgba(255,255,255,0.15)'
                            }}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                                size={22}
                                color="rgba(255,255,255,0.8)"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ width: '80%', alignSelf: 'center', marginTop: 50 }}>
                    <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 50,
                                flexDirection: 'row',
                                borderRadius: 10,
                                backgroundColor: 'rgba(255,255,255,0.12)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: 'rgba(255,255,255,0.15)'
                            }}
                            onPress={() => console.log("sign up")}
                            activeOpacity={0.7}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Sign up</Text>
                            <Ionicons
                                name="person-add-outline"
                                size={22}
                                color="rgba(255,255,255,0.8)"
                            />
                        </TouchableOpacity>

                    <TouchableOpacity
                            style={{
                                width: '100%',
                                height: 50,
                                flexDirection: 'row',
                                borderRadius: 10,
                                backgroundColor: 'rgba(255,255,255,0.12)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: 'rgba(255,255,255,0.15)',
                                marginTop: 15
                            }}
                            onPress={() => router.push('/login')}
                            activeOpacity={0.7}
                        >
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Already have an account? Sign in!</Text>
                            <Ionicons
                                name="person-outline"
                                size={22}
                                color="rgba(255,255,255,0.8)"
                            />
                        </TouchableOpacity>
                </View>

            </View>
            </LinearGradient>
    );
}