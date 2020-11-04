import React from 'react';
import { Text, View, StyleSheet, Image, Button, Linking } from 'react-native';

class About extends React.Component {
    openUrl(url){
        Linking.openURL(url);
    }
    render() {
        return (
            <View  style={{ flex: 1, marginTop: 20 }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                </View>
                <View style={styles.container} >
                    <Image style={styles.picture} source={{ uri: 'https://previews.123rf.com/images/djvstock/djvstock1609/djvstock160900216/62109264-femme-fille-lunettes-engrenage-bulbe-outil-développeur-lupe-nuage-web-réactif-site-de-développement-icône-de-.jpg' }} />
                    <View style={{flex:1, flexDirection: 'column'}} >
                        <Text style={styles.primaryText}>
                            Charif Ayouni {'\n'}
                            Développeur web
                        </Text>

                        <Text  onPress={ () => this.openUrl('https://github.com/charif-ayouni/easy-crypto') } style={{

                            alignSelf: 'center',
                            textAlign: 'center',
                            height: 40,
                            lineHeight: 35,
                            backgroundColor: '#252e47',

                            color: '#FFFFFF',
                            borderRadius: 20,
                            fontSize:15,
                            paddingHorizontal: 10,
                            marginTop:15,
                            marginLeft: 20,
                            marginRight:80,
                        }}>Mon GITHUB</Text>
                    </View>

                </View>


                <View style={styles.container}>
                    <Image style={styles.picture} source={{ uri: 'https://previews.123rf.com/images/djvstock/djvstock1609/djvstock160900216/62109264-femme-fille-lunettes-engrenage-bulbe-outil-développeur-lupe-nuage-web-réactif-site-de-développement-icône-de-.jpg' }} />

                    <View style={{flex:1, flexDirection: 'column'}}>
                        <Text style={styles.primaryText}>
                            Wassim Khadraoui {'\n'}
                            Développeur web
                        </Text>
                        <Text  onPress={ () => this.openUrl('https://github.com/charif-ayouni/easy-crypto') } style={{

                            alignSelf: 'center',
                            textAlign: 'center',
                            height: 40,
                            lineHeight: 35,
                            backgroundColor: '#252e47',

                            color: '#FFFFFF',
                            borderRadius: 20,
                            fontSize:15,
                            paddingHorizontal: 10,
                            marginTop:15,
                            marginLeft: 20,
                            marginRight:80,
                        }}>Mon GITHUB</Text>
                    </View>

                </View>
                <View style={styles.container}>
                    <Image style={styles.picture} source={{ uri: 'https://previews.123rf.com/images/djvstock/djvstock1609/djvstock160900216/62109264-femme-fille-lunettes-engrenage-bulbe-outil-développeur-lupe-nuage-web-réactif-site-de-développement-icône-de-.jpg' }} />
                    <View style={{flex:1, flexDirection: 'column'}}>

                        <Text style={styles.primaryText}>
                            Salim Sassenou {'\n'}
                            Développeur web
                        </Text>

                        <Text  onPress={ () => this.openUrl('https://github.com/charif-ayouni/easy-crypto') } style={{

                            alignSelf: 'center',
                            textAlign: 'center',
                            height: 40,
                            lineHeight: 35,
                            backgroundColor: '#252e47',

                            color: '#FFFFFF',
                            borderRadius: 20,
                            fontSize:15,
                            paddingHorizontal: 10,
                            marginTop:15,
                            marginLeft: 20,
                            marginRight:80,
                        }}>Mon GITHUB</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <Image style={styles.picture} source={{ uri: 'https://previews.123rf.com/images/djvstock/djvstock1609/djvstock160900216/62109264-femme-fille-lunettes-engrenage-bulbe-outil-développeur-lupe-nuage-web-réactif-site-de-développement-icône-de-.jpg' }} />

                    <View style={{flex:1, flexDirection: 'column'}} >
                        <Text style={styles.primaryText}>
                            Houssem Gharbi {'\n'}
                            Développeur web
                        </Text>
                        <Text  onPress={ () => this.openUrl('https://github.com/charif-ayouni/easy-crypto') } style={{

                            alignSelf: 'center',
                            textAlign: 'center',
                            height: 40,
                            lineHeight: 35,
                            backgroundColor: '#252e47',

                            color: '#FFFFFF',
                            borderRadius: 20,
                            fontSize:15,
                            paddingHorizontal: 10,
                            marginTop:15,
                            marginLeft: 20,
                            marginRight:80,
                        }}>Mon GITHUB</Text>

                    </View>

                </View>
            </View>

        )
    }
}

export default About
const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', padding: 12 },
    picture1: { width: 50, height: 50, borderRadius: 7, marginRight: 18 },

    picture: { width: 50, height: 50, borderRadius: 25, marginRight: 18 },
    primaryText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'black',
        marginBottom: 4,
    },
    secondaryText: { fontSize: 14,
        color: 'black',
        marginBottom: 4,flexWrap: 'wrap', },


    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
        fontSize: 20,
        color: '#252e47',

    },

    title: {
        fontSize: 16,
        color: '#000',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#8eb3fa',

        elevation: 2,

    },
    buttonContainer: {
        margin: 20
    },

    buttonStyle: {
        color: 'red',
        marginTop: 20,
        padding: 20,
        backgroundColor: 'green'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    loginButtonSection: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    }, loginButton: {
        backgroundColor: 'blue',
        color: 'white'
    },


});
