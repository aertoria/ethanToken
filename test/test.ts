import { expect } from "chai";
import { ethers } from "hardhat";

describe("EthanToken", function () {
  it("Test contract", async function () {
    const ContractFactory = await ethers.getContractFactory("EthanToken");

    const instance = await ContractFactory.deploy();
    await instance.deployed();

    expect(await instance.name()).to.equal("EthanToken");
  });

    it("Test mint", async function () {
      const [owner, addr1, addr2] = await ethers.getSigners();
      const ContractFactory = await ethers.getContractFactory("EthanToken");

      const instance = await ContractFactory.deploy();
      await instance.deployed();
      await instance.mint(addr1.address, 999999999);

      expect(await instance.balanceOf(addr1.address)).to.equal(999999999);
    });

    it("Test transfer", async function () {
      const [owner, addr1, addr2] = await ethers.getSigners();
      const ContractFactory = await ethers.getContractFactory("EthanToken");

      const instance = await ContractFactory.deploy();
      await instance.deployed();
      await instance.mint(addr1.address, 50);
      expect(await instance.balanceOf(addr1.address)).to.equal(50);

      await instance.connect(addr1).transfer(addr2.address,30);
      expect(await instance.balanceOf(addr1.address)).to.equal(20);
      expect(await instance.balanceOf(addr2.address)).to.equal(30);
    });

    it("Test transfer exceeds balance", async function () {
      const [owner, addr1, addr2] = await ethers.getSigners();
      const ContractFactory = await ethers.getContractFactory("EthanToken");

      const instance = await ContractFactory.deploy();
      await instance.deployed();
      await instance.mint(addr1.address, 50);
      expect(await instance.balanceOf(addr1.address)).to.equal(50);

      await await expect(instance.connect(addr1).transfer(addr2.address,80)).to.be.revertedWith('ERC20: transfer amount exceeds balance');
    });

    it("Test mint reach hardlimit", async function () {
      const [owner, addr1, addr2] = await ethers.getSigners();
      const ContractFactory = await ethers.getContractFactory("EthanToken");

      const instance = await ContractFactory.deploy();
      await instance.deployed();
      await expect(instance.mint(addr1.address, 999999999+2)).to.be.revertedWith('Not possible to mint tokens more than 1b hard limit');
    });

});
