# pokemon-names-and-types
[![travis build](https://img.shields.io/travis/SahajR/pokemon-names-and-types.svg?style=flat-square)](https://travis-ci.org/SahajR/pokemon-names-and-types)
[![codecov](https://codecov.io/gh/SahajR/pokemon-names-and-types/branch/master/graph/badge.svg?style=flat-square)](https://codecov.io/gh/SahajR/pokemon-names-and-types)
[![downloads](https://img.shields.io/npm/dm/pokemon-names-and-types.svg?style=flat-square)](http://npm-stat.com/charts.html?package=pokemon-names-and-types&from=2016-10-06)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![version](https://img.shields.io/npm/v/pokemon-names-and-types.svg?style=flat-square)](http://npm.im/pokemon-names-and-types)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/500ebaa93ed7411c8be080a0f170e099)](https://www.codacy.com/app/SahajR/pokemon-names-and-types?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SahajR/pokemon-names-and-types&amp;utm_campaign=Badge_Grade)
[![MIT License](https://img.shields.io/npm/l/pokemon-names-and-types.svg?style=flat-square)](http://opensource.org/licenses/MIT)
--
An open source project created as practice for the egghead.io course - https://egghead.io/courses/how-to-write-an-open-source-javascript-library
![Pokemon](https://srstatic.nyc3.digitaloceanspaces.com/pkmn.png)
## Pokemon Names ##
**Get a all Pokemon names**
```javascript
import {pkmn} from 'pokemon-names-and-types'
pkmn.all //Returns all pokemon names as a json array
```
**Get a random Pokemon name**
```javascript
import {pkmn} from 'pokemon-names-and-types'
pkmn.random() //Returns a random pokemon
```
**Get  *n* Pokemon names**
```javascript
import {pkmn} from 'pokemon-names-and-types'
pkmn.random(n) //Returns n random pokemon
```
----------
## Pokemon Types ##
**Get type to which another is weak to**
```javascript
import {pkmnTypes} from 'pokemon-names-and-types'
pkmnTypes.getSuperEffectiveType("Steel") //Ice
```
**Check if a type is strong/weak against another**
```javascript
import {pkmnTypes} from 'pokemon-names-and-types'
pkmnTypes.isWeak("Normal","Rock") //True
pkmnTypes.isStrong("Water","Ghost") //False
```
---
## React Pokemon Badge component ##
**Get a badge with name and specified types**
```javascript
import {Badge} from 'pokemon-names-and-types' 
//Returns a badge with types indicated by color:
<Badge name="SomePokemon" type1="Fire" type2="Grass"/>
```
