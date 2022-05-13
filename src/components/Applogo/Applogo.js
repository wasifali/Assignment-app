import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
const Applogo = ({ imagePath }) => {
    return (
        <View style={styles.container}>
            <Image
                source={imagePath}
                style={styles.logoStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { height: 200, marginHorizontal: 20 },
    logoStyle: { height: 200, width: 250, alignSelf: 'center' }
});

export default Applogo;