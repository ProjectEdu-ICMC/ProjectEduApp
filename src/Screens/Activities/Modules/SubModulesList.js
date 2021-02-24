import React, { Component } from 'react';
import {StyleSheet,Text,ScrollView, Image,FlatList,TouchableOpacity,Dimensions,View} from 'react-native';
import {Header} from 'react-native-elements'
import ModuleIcon from './ModuleIcon.js'
import {data} from './newData.js'

export default class SubModulesList extends Component {

  constructor(props) {
        super(props);
        this.state = {

          mainData: data,
        };
      }

  componentDidMount(){

    this.setState({subModules: this.state.mainData.map((subModule, index) => {
    
      // Pra cada submódulo, é criado um objeto
      //esse vetor é depois reinderizado pela FlatList mais abaixo
      return {
        id:index,
        name:subModule.subModuleName,
        topics:subModule.subModuleTopics,
        exercises:subModule.subModuleExercises,
        image:subModule.subModuleImage
        //navegation:"subModules"
      }
    })})
  }
  
  //vai para a tela com a lista de tópicos, passando as informações
  //do submódulo selecionado
  clickEventListener = (item) => {
    this.props.navigation.navigate('Topics', {
      subModuleName:item.name,
      topics:item.topics,
      exercises:item.exercises
    });
  }

    

  render() {
    console.log(this.props.navigation.state.params)
    return (
      <View>
        {/*Screen Header Information */}
        <Header
            backgroundColor = '#1e272e'
            barStyle = 'light-content'
            leftComponent={{
            icon: 'arrow-back',
            color: '#fff',
            onPress: () => this.props.navigation.navigate("Activities"),
            }}
            centerComponent={{ text: 'Test Module', style: { color: '#fff' } }}
        />
        {/*Renders Topics with a FlatList */}
        <FlatList 
          //style={styles.contentList}
          ListFooterComponent={<View style={{ height: 20 }}></View>}
          columnWrapperStyle={styles.listContainer}
          data={this.state.subModules}
          keyExtractor= {(item) => {
            return (item.id).toString();
          }}
          renderItem={({item}) => {
          return (
            <ModuleIcon item={item} ClickEventListener={this.clickEventListener}/>
          )}}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoImage:{
    width: 200,
    height: 200
  },
  containerLogo:{
    alignItems:"center",
    margin: 10,
  },
  container:{
    flex:1,
    backgroundColor:"#636e72"
  },
  contentList:{
    flex:1,
    paddingBottom:20
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:2,
    borderColor:"#ebf0f7"
  },
  imagePlay:{
    width:60,
    height:60,
  },
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius:30,
  },

  name:{
    fontSize:11,
    flex:1,
    alignSelf:'center',
    color:"#000000",
    fontWeight:'bold'
  },
  count:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#6666ff"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "white",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  followButtonPlay: {
    marginTop:10,
    marginBottom: 10,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  followButtonText:{
    color: "#dcdcdc",
    fontSize:12,
  },

});  

  
