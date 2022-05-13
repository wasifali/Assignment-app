import React from 'react'
import { TextInput } from 'react-native'
const InputField = ({ value, name, onChange, editable, placeholder, placeholderTextColor, returnKeyType, style, keyboardType, secureTextEntry }) => {
    return (
        <TextInput style={style}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            onChangeText={text => onChange({ name, text })}
            editable={editable}
        />
    );
};

export default InputField;