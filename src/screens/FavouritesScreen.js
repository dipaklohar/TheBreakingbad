import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  StatusBar
} from 'react-native';
import { color } from '../values';
import { ListItem, ActionBar } from '../components';


const tempdata = [
  {
    "char_id": 1,
    "name": "Walter White",
    "birthday": "09-07-1958",
    "occupation": [
      "High School Chemistry Teacher",
      "Meth King Pin"
    ],
    "img": "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg",
    "status": "Presumed dead",
    "nickname": "Heisenberg",
    "appearance": [
      1,
      2,
      3,
      4,
      5
    ],
    "portrayed": "Bryan Cranston",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
  },
  {
    "char_id": 2,
    "name": "Jesse Pinkman",
    "birthday": "09-24-1984",
    "occupation": [
      "Meth Dealer"
    ],
    "img": "https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441",
    "status": "Alive",
    "nickname": "Cap n' Cook",
    "appearance": [
      1,
      2,
      3,
      4,
      5
    ],
    "portrayed": "Aaron Paul",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
  },
  {
    "char_id": 3,
    "name": "Skyler White",
    "birthday": "08-11-1970",
    "occupation": [
      "House wife",
      "Book Keeper",
      "Car Wash Manager",
      "Taxi Dispatcher"
    ],
    "img": "https://s-i.huffpost.com/gen/1317262/images/o-ANNA-GUNN-facebook.jpg",
    "status": "Alive",
    "nickname": "Sky",
    "appearance": [
      1,
      2,
      3,
      4,
      5
    ],
    "portrayed": "Anna Gunn",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
  },
  {
    "char_id": 4,
    "name": "Walter White Jr.",
    "birthday": "07-08-1993",
    "occupation": [
      "Teenager"
    ],
    "img": "https://media1.popsugar-assets.com/files/thumbor/WeLUSvbAMS_GL4iELYAUzu7Bpv0/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2018/01/12/910/n/1922283/fb758e62b5daf3c9_TCDBRBA_EC011/i/RJ-Mitte-Walter-White-Jr.jpg",
    "status": "Alive",
    "nickname": "Flynn",
    "appearance": [
      1,
      2,
      3,
      4,
      5
    ],
    "portrayed": "RJ Mitte",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
  },
  {
    "char_id": 5,
    "name": "Henry Schrader",
    "birthday": "Unknown",
    "occupation": [
      "DEA Agent"
    ],
    "img": "https://vignette.wikia.nocookie.net/breakingbad/images/b/b7/HankS5.jpg/revision/latest/scale-to-width-down/700?cb=20120620014136",
    "status": "Deceased",
    "nickname": "Hank",
    "appearance": [
      1,
      2,
      3,
      4,
      5
    ],
    "portrayed": "Dean Norris",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
  },
  {
    "char_id": 6,
    "name": "Marie Schrader",
    "birthday": "Unknown",
    "occupation": [
      "Housewife",
      "Clepto"
    ],
    "img": "https://vignette.wikia.nocookie.net/breakingbad/images/1/10/Season_2_-_Marie.jpg/revision/latest?cb=20120617211645",
    "status": "Alive",
    "nickname": "Marie",
    "appearance": [
      1,
      2,
      3,
      4,
      5
    ],
    "portrayed": "Betsy Brandt",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
  },
  {
    "char_id": 7,
    "name": "Mike Ehrmantraut",
    "birthday": "Unknown",
    "occupation": [
      "Hitman",
      "Private Investigator",
      "Ex-Cop"
    ],
    "img": "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_mike-ehrmantraut-lg.jpg",
    "status": "Deceased",
    "nickname": "Mike",
    "appearance": [
      2,
      3,
      4,
      5
    ],
    "portrayed": "Jonathan Banks",
    "category": "Breaking Bad, Better Call Saul",
    "better_call_saul_appearance": [
      1,
      2,
      3,
      4,
      5
    ]
  },
  {
    "char_id": 8,
    "name": "Saul Goodman",
    "birthday": "Unknown",
    "occupation": [
      "Lawyer"
    ],
    "img": "https://vignette.wikia.nocookie.net/breakingbad/images/1/16/Saul_Goodman.jpg/revision/latest?cb=20120704065846",
    "status": "Alive",
    "nickname": "Jimmy McGill",
    "appearance": [
      2,
      3,
      4,
      5
    ],
    "portrayed": "Bob Odenkirk",
    "category": "Breaking Bad, Better Call Saul",
    "better_call_saul_appearance": [
      1,
      2,
      3,
      4,
      5
    ]
  },
  {
    "char_id": 9,
    "name": "Gustavo Fring",
    "birthday": "Unknown",
    "occupation": [
      "Los-Pollos co-Founder",
      "Philanthropist",
      "Cartel Leader"
    ],
    "img": "https://vignette.wikia.nocookie.net/breakingbad/images/1/1f/BCS_S4_Gustavo_Fring.jpg/revision/latest?cb=20180824195925",
    "status": "Deceased",
    "nickname": "Gus",
    "appearance": [
      2,
      3,
      4
    ],
    "portrayed": "Giancarlo Esposito",
    "category": "Breaking Bad, Better Call Saul",
    "better_call_saul_appearance": [
      3,
      4,
      5
    ]
  },
  {
    "char_id": 10,
    "name": "Hector Salamanca",
    "birthday": "Unknown",
    "occupation": [
      "Former Senior Cartel Leader"
    ],
    "img": "https://vignette.wikia.nocookie.net/breakingbad/images/b/b4/Hector_BCS.jpg/revision/latest?cb=20170810091606",
    "status": "Deceased",
    "nickname": "Don Hector",
    "appearance": [
      1,
      2,
      3,
      4
    ],
    "portrayed": "Mark Margolis",
    "category": "Breaking Bad, Better Call Saul",
    "better_call_saul_appearance": [
      2,
      3,
      4,
      5
    ]
  },
  {
    "char_id": 11,
    "name": "Domingo Molina",
    "birthday": "Unknown",
    "occupation": [
      "Meth Distributor"
    ],
    "img": "https://vignette.wikia.nocookie.net/breakingbad/images/e/e7/Krazy8.png/revision/latest?cb=20130208041554",
    "status": "Deceased",
    "nickname": "Krazy-8",
    "appearance": [
      1
    ],
    "portrayed": "Maximino Arciniega",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
  },
  {
    "char_id": 12,
    "name": "Tuco Salamanca",
    "birthday": "Unknown",
    "occupation": [
      "Meth Distributor"
    ],
    "img": "https://vignette.wikia.nocookie.net/breakingbad/images/a/a7/Tuco_BCS.jpg/revision/latest?cb=20170810082445",
    "status": "Deceased",
    "nickname": "Tuco",
    "appearance": [
      1,
      2
    ],
    "portrayed": "Raymond Cruz",
    "category": "Breaking Bad, Better Call Saul",
    "better_call_saul_appearance": [
      1,
      2
    ]
  },
  {
    "char_id": 13,
    "name": "Marco & Leonel Salamanca",
    "birthday": "Unknown",
    "occupation": [
      "Cartel Hitman"
    ],
    "img": "https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_the-cousins-lg.jpg",
    "status": "Deceased",
    "nickname": "The Cousins",
    "appearance": [
      3
    ],
    "portrayed": "Luis & Daniel Moncada",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
  },
  {
    "char_id": 14,
    "name": "Lydia Rodarte-Quayle",
    "birthday": "Unknown",
    "occupation": [
      "Executive at Madrigal"
    ],
    "img": "https://media1.popsugar-assets.com/files/thumbor/wERDST0TUb-iHCSb2r5ZpsvaZLo/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2013/07/17/675/n/1922283/fae2f583f04bb80f_Laura-Fraser-is-back-as-Lydia-Rodarte-Quayle_gallery_primary/i/Laura-Fraser-Lydia-Rodarte-Quayle.jpg",
    "status": "Deceased",
    "nickname": "Lydia",
    "appearance": [
      5
    ],
    "portrayed": "Laura Fraser",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
  },
  {
    "char_id": 15,
    "name": "Todd Alquist",
    "birthday": "Unknown",
    "occupation": [
      "Lab Assistant",
      "Enforcer",
      "Meth Cook"
    ],
    "img": "https://vignette.wikia.nocookie.net/breakingbad/images/9/95/Todd_brba5b.png/revision/latest?cb=20130717134303",
    "status": "Deceased",
    "nickname": "Ricky Hitler",
    "appearance": [
      5
    ],
    "portrayed": "Jesse Plemons",
    "category": "Breaking Bad",
    "better_call_saul_appearance": []
  }]


const FavouritesScreen = (props) => {

  const [Userslist, setUserslist] = useState([...tempdata]);


  return (
    <View style={styles.mainContainer}>
      <StatusBar
        backgroundColor={color.actionbar} />
      <ActionBar
        properties={props} />
      <FlatList
        style={{ paddingTop: 60 }}
        data={Userslist}
        renderItem={({ item }) =>
          <ListItem
            props={props}
            item={item} />}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: color.actionbar
  },

});

export default FavouritesScreen;
