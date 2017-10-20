import { expect } from "chai";
import sinon from "sinon";

import { BidReceiptService } from "../src/lib/services";

const identity = x => x;

describe("BidReceiptService", function() {
  let bidRecepitService;
  let BidReceipt;
  let eth;

  beforeEach(() => {
    BidReceipt = { insert: identity, update: identity };
    eth = { sign: identity, verify: identity, toHex: identity };

    bidRecepitService = new BidReceiptService();
    bidRecepitService.BidReceipt = BidReceipt;
    bidRecepitService.eth = eth;
  });

  describe("sign", function() {
    it("should throw if the bidGroup is missing the id, message or receivedTimestamp or if the message is not a valid string", async function() {
      let errorMessages = [];

      const sign = async bidGroup => {
        try {
          await bidRecepitService.sign(bidGroup);
        } catch (error) {
          errorMessages.push(error.message);
        }
      };

      await sign({ message: "Hey there" });
      await sign({ id: 22 });
      await sign({ id: 22, message: "Hello" });
      await sign({ id: 22, message: {}, receivedTimestamp: new Date() });

      const missingProps =
        "Can't sign an invalid bid group. Missing properties, the bid group has to have at least an id, message an receivedTimestamp properties";
      const invalidMessage = "Can't sign an invalid bid group. Invalid message";

      expect(errorMessages.length).to.equal(4);
      expect(errorMessages).to.deep.equal([
        missingProps,
        missingProps,
        missingProps,
        invalidMessage
      ]);
    });

    it("should insert a bid receipt with the message and signature for the bid group", async function() {
      const timestamp = 1507399991050000
      const bidGroup = {
        id: 20,
        message: "Some message",
        receivedTimestamp: new Date(timestamp)
      };

      const bidRecepitId = 30;
      const signature = "0x11d072f4fa63b4f1111111db50c1f17c931dd670";
      const serverMessage = `30||${timestamp}||Some message`;

      const spy = sinon.spy(BidReceipt, "update");

      sinon
        .stub(BidReceipt, "insert")
        .withArgs(
          sinon.match({
            receivedTimestamp: sinon.match.date,
            bidGroupId: bidGroup.id
          })
        )
        .returns({ id: bidRecepitId });

      sinon
        .stub(eth, "sign")
        .withArgs(serverMessage, "0xdeadbeef")
        .returns(signature);

      await bidRecepitService.sign(bidGroup);

      expect(
        spy.calledWithExactly(
          sinon.match({ signature, message: serverMessage }),
          sinon.match({ id: bidRecepitId })
        )
      ).to.be.true;
    });
  });
});
