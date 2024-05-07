import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text'
import LanguageTag from './LanguageTag';
import Logo from './Logo';

const RepositoryItem = ({ item }) => {

    const formatCount = (count) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k';
        }
        return count.toString();
    };

    const styles = StyleSheet.create({
        flexContainer: {
            display: 'flex',
            backgroundColor: 'white',
            paddingBottom: 10,
        },
        headerContainer: {
            flexGrow: 0,
            flexDirection: 'row',
            padding: 10,
            gap: 20,
        },
        headerTexts: {
            flexGrow: 0,
            padding: 10,
        },
        statsContainer: {
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        statsColumn: {
            flexGrow: 1,
        },
    });

    const StatsColumn = ({ header, value }) => {
        return (
          <View>
            <Text fontWeight="bold" fontSize="subheading">
                {header}
            </Text>
            <Text>
                {value}
            </Text>
          </View>
        );
      };

    return (
        <View style={styles.flexContainer}>
            <View style={styles.headerContainer}>
                <Logo source={item.ownerAvatarUrl} />
                <View>
                    <Text fontWeight="bold" fontSize="subheading">
                        {item.fullName}
                    </Text>
                    <Text color="textSecondary">
                        {item.description}
                    </Text>
                    <LanguageTag language={item.language} />
                </View>
            </View>
            <View style={styles.statsContainer}>
                <StatsColumn header='Stars' value={formatCount(item.stargazersCount)}/>
                <StatsColumn header='Forks' value={formatCount(item.forksCount)}/>
                <StatsColumn header='Reviews' value={item.reviewCount}/>
                <StatsColumn header='Rating' value={item.ratingAverage}/>
            </View>
        </View>
    );
};

export default RepositoryItem;
