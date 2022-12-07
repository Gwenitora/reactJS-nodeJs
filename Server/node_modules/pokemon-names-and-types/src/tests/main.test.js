import React from "react";
import chai, {expect} from "chai";
import jsxChai from "jsx-chai";
import {pkmn} from "../names.js";
import {pkmnTypes} from "../types.js";
import {Badge} from "../Badge.js";
import TestUtils from "react-dom/test-utils";

chai.use(jsxChai);

const isArrayOfStrings = (array) => array.every((item) => typeof item === "string");

describe("pokemon-names-and-types", () => {
    describe("all", () => {
        it("should be an array of strings", () => {
            expect(pkmn.all).to.satisfy(isArrayOfStrings);
        });

        it("should contain `Bulbasaur`", () => {
            expect(pkmn.all).to.include("Bulbasaur");
        });
    });

    describe("random", () => {
        it("should return a random item from the list", () => {
            const randomItem = pkmn.random();
            expect(pkmn.all).to.include(randomItem);
        });

        it("should return an array of random items if passed a number", () => {
            const randomItems = pkmn.random(3);
            expect(randomItems).to.have.length(3);
            randomItems.forEach((item) => {
                expect(pkmn.all).to.include(item);
            });
        });

    });

    describe("types", () => {
        it("should be weak to Water", () => {
            expect(pkmnTypes.isWeak("Fire", "Water")).to.equal(true);
        });
        it("should be Strong against Water", () => {
            expect(pkmnTypes.isStrong("Electric", "Water")).to.equal(true);
        });
        it("should have Water as a strength", () => {
            expect(pkmnTypes.getSuperEffectiveType("Electric")).to.equal("water");
        });
        it("should not have any strengths", () => {
            expect(pkmnTypes.getSuperEffectiveType("Normal")).to.equal("none");
        });
        it("should not have any strengths/weaknesses if wrong types are passed in", () => {
            expect(pkmnTypes.isStrong("lmao", "rofl")).to.equal(false);
            expect(pkmnTypes.isWeak("lmao", "rofl")).to.equal(false);
            expect(pkmnTypes.isStrong("lmao")).to.equal(false);
            expect(pkmnTypes.isWeak("lmao")).to.equal(false);
            expect(pkmnTypes.isStrong()).to.equal(false);
            expect(pkmnTypes.isWeak()).to.equal(false);
        });
    });

    describe("badges", () => {

        const stylPrimary = {
            backgroundColor : "#A9A878",
            flex: "1 1 50%",
            width: "50px",
            height: "50px"
        };

        const stylSecondary = {
            ...stylPrimary,
            backgroundColor : "#7038F9"
        };

        const stylName = {
            position : "absolute",
            left : "50%",
            top : "50%",
            color: "white"
        };

        const stylContainer = {
            display : "flex",
            position: "relative"
        };

        it("should return a badge", () => {
                const renderer = TestUtils.createRenderer();
                renderer.render(<Badge name="Sahaj" type1="Normal" type2="Dragon"/>);
                const actual = renderer.getRenderOutput();
                const expected = (
                    <div style={stylContainer}>
                        <div style = {stylPrimary}/>
                        <div style = {stylSecondary}/>
                        <div style = {stylName}>Sahaj</div>
                    </div>
                );
                expect(expected).to.deep.equal(actual);
            });


        it("should return a badge with one type", () => {
              const renderer = TestUtils.createRenderer();
                renderer.render(<Badge name="Sahaj" type1="Normal"/>);
                const actual = renderer.getRenderOutput();
                const expected = (
                    <div style={stylContainer}>
                        <div style = {stylPrimary}/>
                        <div style = {stylName}>Sahaj</div>
                    </div>
                );
                expect(expected).to.deep.equal(actual);
        });
    });
});
