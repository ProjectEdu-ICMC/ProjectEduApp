import React from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View,
} from 'react-native';

function TopicCard({ item, OnPress }) {
    console.log(item)
    return (
        <TouchableOpacity style={styles.card} onPress={() => OnPress(item)}>
            <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Image
                    style={styles.imagePlay}
                    source={{
                        uri:
                            'https://images.vexels.com/media/users/3/135176/isolated/preview/a6508e565d25ab01f79a35c4319e0083-jogar-bot--o---cone-plana-by-vexels.png',
                    }}
                />
            </View>
        </TouchableOpacity>
    );
}

export default TopicCard;

const styles = StyleSheet.create({
    cardContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        marginLeft: 10
    },
    imagePlay: {
        width: 60,
        height: 60,
        marginLeft: 10
    },
    card: {
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
        marginTop: 20,
        backgroundColor: 'white',
        padding: 10,
        flexDirection: 'row',
        borderRadius: 10,
    },
    name: {
        fontSize: 15,
        flex: 1,
        // width: '80%',
        // alignSelf: 'center',
        color: '#000000',
        fontWeight: 'bold',
    },
});
