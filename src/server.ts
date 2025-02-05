import express from "express";
import cors from "cors";
import { getDigipet } from "./digipet/model";
import { feedDigipet, hatchDigipet, ignoreDigipet, rehomeDigipet, trainDigipet, walkDigipet } from "./digipet/controller";

const app = express();

/**
 * Simplest way to connect a front-end. Unimportant detail right now, although you can read more: https://flaviocopes.com/express-cors/
 */
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, check out the /instructions endpoint!",
    description:
    "Welcome to Digipet, the totally original digital pet game! Keep your pet happy, healthy and well-disciplined to win the game. If in doubt, check out the /instructions endpoint!",
    });
});

app.get("/instructions", (req, res) => {
  res.json({
    message:
      "You can check out your digipet's stats with /digipet, and add various actions after that with the /digipet/[action], for actions like walk, train, feed, ignore and hatch. For example, try /digipet/walk to walk a digipet!",
    description:
      "You can check out your digipet's stats below, and do various actions after that with the buttons, for example walk, train, feed, ignore, hatch, and rehome.",
    });
});

app.get("/digipet", (req, res) => {
  const digipet = getDigipet();
  if (digipet) {
    res.json({
      message: "Your digipet is waiting for you!",
      description: "Your digipet is waiting for you!",
      digipet, // equivalent to digipet: digipet
    });
  } else {
    res.json({
      message: "You don't have a digipet yet! Try hatching one with /hatch",
      description: "You don't have a digipet yet! Try hatching one with the hatch button",
      digipet: undefined,
    });
  }
});

app.get("/digipet/hatch", (req, res) => {
  const digipet = getDigipet();
  if (digipet) {
    res.json({
      message: "You can't hatch a digipet now because you already have one!",
      description: "You can't hatch a digipet now because you already have one!",
      digipet,
    });
  } else {
    const digipet = hatchDigipet();
    res.json({
      message:
        "You have successfully hatched an adorable new digipet. Just the cutest.",
        description: "You have successfully hatched an adorable new digipet. Just the cutest.",
      digipet,
    });
  }
});

app.get("/digipet/walk", (req, res) => {
  // check the user has a digipet to walk
  if (getDigipet()) {
    walkDigipet();
    res.json({
      message: "You walked your digipet. It looks happier now!",
      description: "You walked your digipet. It looks happier now!",
      digipet: getDigipet(),
    });
  } else {
    res.json({
      message:
        "You don't have a digipet to walk! Try hatching one with /digipet/hatch",
        description: "You don't have a digipet to walk! Try hatching one with the hatch button",
    });
  }
});

app.get("/digipet/train", (req, res) => {
  if (getDigipet()) {
    trainDigipet();
    res.json({
      message: "You trained your digipet. It looks more disciplined now!",
      description: "You trained your digipet. It looks more disciplined now!",
      digipet: getDigipet(),
    });
  } else {
    res.json({
      message: "You don't have a digipet to train! Try hatching one with /digipet/hatch",
      description: "You don't have a digipet to train! Try hatching one with the hatch button",
    });
  }
});

app.get("/digipet/feed", (req, res) => {
  if (getDigipet()) {
    feedDigipet();
    res.json({
      message: "You fed your digipet. It enjoyed feeding!",
      description: "You fed your digipet. It enjoyed feeding!",
      digipet: getDigipet(),
    });
  } else {
    res.json({
      message: "You don't have a digipet to feed! Try hatching one with /digipet/hatch",
      description: "You don't have a digipet to feed! Try hatching one with the hatch button",
    });
  }
});

app.get("/digipet/ignore", (req, res) => {
  if (getDigipet()) {
    ignoreDigipet();
    res.json({
      message: "You ignored your digipet. It is feeling sad :(",
      description: "You ignored your digipet. It is feeling sad :(",
      digipet: getDigipet(),
    });
  } else {
    res.json({
      message: "You don't have a digipet to ignore! Try hatching one with /digipet/hatch",
      description: "You don't have a digipet to ignore! Try hatching one with the hatch button",
    });
  }
});

app.get("/digipet/rehome", (req, res) => {
  if (getDigipet()) {
    rehomeDigipet();
    res.json({
      message: "Your digipet has been successfully rehomed!",
      description: "Your digipet has been successfully rehomed!",
    })
  } else {
    res.json({
      message: "You can't rehome a digipet as you don't have one! Try hatching one with /digipet/hatch",
      description: "You can't rehome a digipet as you don't have one! Try hatching one with the hatch button",
    });
  }
});

export default app;
