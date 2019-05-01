// const db = require("../models");
const translators = require("../utils/translators");

// Defining methods for the booksController
module.exports = {
  returnGraph: function (req, res) {
    // console.log(req.body);
    let play = req.body.play;
    let test = req.body.test;
    // console.log("It works");
    let midiPlay = translators.pitchArrayToMidi(play);
    let midiTest = translators.pitchArrayToMidi(test);
    midiPlay = translators.transposeMidiArray(midiPlay, -7);
    play = translators.evalPitchArray(midiPlay, "F");
    test = translators.evalPitchArray(midiTest, "F");
    let dualPlay = translators.formatDual(midiPlay, play);
    let dualTest = translators.formatDual(midiTest, test);
    let playDeltas = translators.deltaDual(dualPlay);
    let testDeltas = translators.deltaDual(dualTest);
    let intervals = translators.intervalCompare(dualPlay, dualTest);
    let data = {
      pD: playDeltas,
      tD: testDeltas,
      compareIntervals: intervals,
      dP: dualPlay,
      dT: dualTest,
      assessMotion: translators.assessMotion
    };
    // console.log(req);
    res.json(data);
  },
  analyze: (request, res) => {
    let req = request.body.exercise
    // console.log("backEnd", req)
    let analyticObject = {
      voices: {
        duals: [],
        deltas: [],
      }, relations: {
        intervals: [],
        motions: []
      }
    }
    let generativeObject = {
      voices: {
        duals: [],
        deltas: []
      }
    }
    let anObV = analyticObject.voices
    let anObR = analyticObject.relations
    let genOb = generativeObject.voices
    // for each midi line received we convert it to pitches and duals, then assess the deltas
    req.midi.forEach((voice, index) => {
      let pitch = translators.evalPitchArray(voice, req.key)
      let dual = { [`voice${index + 1}`]: translators.formatDual(voice, pitch) }
      anObV.duals.push(dual)
      genOb.duals.push(dual[`voice${index + 1}`])
      let delta = { [`delta${index + 1}`]: translators.deltaDual(dual[`voice${index + 1}`]) }
      anObV.deltas.push(delta)
      genOb.deltas.push(delta[`delta${index + 1}`])
    })
    /// LOOP LOGIC--We must have lower voices first
    // let array = ["w", "x", "y", "z", "0"]
    // for (var i = 1; i <= array.length; i++) {
    //   let first = (array[i - 1])
    //   for (var j = i + 1; j <= array.length; j++) {
    //     let second = (array[j - 1])
    //   }
    // }
    // LOOP TO GET INTERVALS
    let arrayDuals = generativeObject.voices.duals
    for (var i = 1; i <= arrayDuals.length; i++) {
      let first = (arrayDuals[i - 1])
      for (var j = i + 1; j <= arrayDuals.length; j++) {
        let second = (arrayDuals[j - 1])
        let intervals = { [`intervals${i}-${j}`]: translators.intervalCompare(first, second) }
        anObR.intervals.push(intervals)
      }
    }
    // console.log("an-v", anObV)
    // console.log("an-r", anObR)
    // console.log("gen", genOb)
    let arrayDeltas = generativeObject.voices.deltas
    for (var i = 1; i <= arrayDeltas.length; i++) {
      let first = (arrayDeltas[i - 1])
      for (var j = i + 1; j <= arrayDeltas.length; j++) {
        let second = (arrayDeltas[j - 1])
        let motions = { [`motions${i}-${j}`]: translators.assessMotion(first, second) }
        anObR.motions.push(motions)
      }
    }









    // console.log("anObV[0]", analyticObject.voices.duals[0])
    // console.log("anObV[1]", analyticObject.voices.duals[1])
    // console.log("anObV[0]", analyticObject.voices.deltas[0])
    // console.log("anObV[1]", analyticObject.voices.deltas[1])
    // console.log(analyticObject.voices)
    // console.log(generativeObject.voices)
    let ok = "ok"
    res.json(analyticObject)
  }
};
// console.log(translators.assessMotion)