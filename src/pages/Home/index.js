import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, Button, SafeAreaView, TouchableOpacity, FlatList} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';

import CategoryItem from '../../components/Categoryitem';
import { getFavorite, setFavorite} from '../../services/favorite';
import FavoritePost from '../../components/favoritePost';
import api from '../../services/api';


export default function Home(){

    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [edCategory, setEdCategory] = useState([])

    useEffect(() => {
       // chamando a api quando a tela é iniciada.
      async  function loadData(){
          // usando get para pegar a api.
         const category = await api.get("/api/categories?populate=icon")
         setCategories(category.data.data)
        }
        loadData();

    }, [])

    useEffect(() => {
        async function favorite(){
           const response = await getFavorite()
           setEdCategory(response);
        }
        favorite();
    }, [])
    
    // Favoritando uma categoria
  async  function handleFavorite(id){
        const response = await setFavorite(id)

       setEdCategory(response)
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>Dev Blog</Text>
                <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
                 <Feather name='search' size={24} color='#fff' />
                </TouchableOpacity>
            </View>

            <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight: 12}}
            style={styles.categories}
            data={categories}
            //keyextractor pedi para transformar para string
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => (
                <CategoryItem
                data={item}
                favorite={() => handleFavorite(item.id)}
                />
            ) }
             />

             <View style={styles.main}>
                 {edCategory.length !== 0  && (
                     <FlatList
                     style={{marginTop: 50, maxHeight: 100, paddingStart: 18,}}
                     contentContainerStyle={{paddingEnd: 18,}}
                     data={edCategory}
                     horizontal={true}
                     showsHorizontalScrollIndicator={false}
                     keyExtractor={(item) => String(item.id)}
                     renderItem={({item}) => <FavoritePost data={item}/>}
                     
                     />
                 )}

                 <Text style={[styles.title, {marginTop: edCategory.length > 0 ? 14 : 46}]}>Conteúdos em alta</Text>

             </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#232630',
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 18,
        marginTop: 18,
        marginBottom: 24,
    },
    name:{
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',

    },
    categories:{
        maxHeight: 115,
        backgroundColor: '#EFEFEF',
        marginHorizontal: 18,
        borderRadius: 8,
        zIndex: 9,
    },
    main:{
        backgroundColor:'#fff',
        flex: 1,
        marginTop: -30,
    },
    title:{
        fontSize: 22,
        paddingHorizontal: 18,
        marginBottom: 14,
        fontWeight: 'bold',
        color: '#162133',

    }
})