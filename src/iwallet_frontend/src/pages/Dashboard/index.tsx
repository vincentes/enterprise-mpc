import { Alert, Button, Card, Modal, notification } from "antd";
import Table, { ColumnProps } from "antd/es/table";
import { useEffect, useState } from "react";
import CreateVaultModal from "../Vaults/Create";
import { useNavigate } from "react-router-dom";

type Vault = {
  id: string;
  name: string;
  available: string;
  blockchains: string[];
};

const columns: ColumnProps<Vault>[] = [
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    className: "font-semibold",
  },
  {
    title: "AVAILABLE",
    dataIndex: "available",
    key: "available",
  },
  {
    title: "BLOCKCHAINS",
    dataIndex: "blockchains",
    key: "blockchains",
    render: (blockchains: string[]) => {
      // show eth and btc icon accordingly (can show both if both are present in the array)
      // use svgs
      return (
        <div>
          {blockchains.map((blockchain) => {
            return (
              <img
                key={blockchain}
                src={`/public/${blockchain}.svg`}
                alt={blockchain}
                className="w-6 h-6 mr-[-8px]"
              />
            );
          })}
        </div>
      );
    },
  },
];

const mockVaults: Vault[] = [
  {
    id: "1",
    name: "Funding",
    available: "$32.00",
    blockchains: ["eth", "btc"],
  },
  {
    id: "2",
    name: "Investments",
    available: "$1,000.4",
    blockchains: ["btc"],
  },
  {
    id: "3",
    name: "Savings",
    available: "$5,000.2",
    blockchains: ["eth"],
  },
];

const Dashboard = () => {
  const [dataSource, setDataSource] = useState<Vault[]>(mockVaults);
  const [api] = notification.useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVaults();
  }, []);

  const fetchVaults = async () => {
    try {
      setIsLoading(true);
      // Simulating an API call with mock data
      setTimeout(() => {
        setIsLoading(false);
        setDataSource(mockVaults);
      }, 1000);
    } catch (error) {
      api.error({
        message: "Error fetching vaults",
        description: "Please try again later.",
        placement: "bottom",
      });
    }
  };

  const onRowClick = (record: Vault) => {
    navigate(`/vaults/${record.id}`);
  };

  const showModal = () => {
    setOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-left p-16">
      <h1 className="text-3xl font-bold">Vaults</h1>
      {/* <Alert
        message="What is a Vault?"
        description={
          <>
            <p>
              A Vault account is an easy way to separate and maintain security
              boundaries across assets.
            </p>
          </>
        }
        type="info"
        showIcon
        style={{ marginTop: 16, marginBottom: 16 }}
      /> */}
      <div className="flex flex-row justify-between">
        <p className="text-lg">Manage and secure your assets.</p>
        <Button
          type="primary"
          className="mt-4"
          onClick={() => {
            showModal();
          }}
        >
          New vault
        </Button>
      </div>

      <CreateVaultModal
        visible={open}
        setVisible={setOpen}
        refreshVaults={() => {
          fetchVaults();
        }}
      />
      <Card>
        <Table
          loading={isLoading}
          rowKey="id"
          rowClassName="cursor-pointer"
          dataSource={dataSource}
          showHeader={false}
          columns={columns}
          pagination={false}
          onRow={(record) => ({
            onClick: () => onRowClick(record),
          })}
        />
      </Card>
    </main>
  );
};

export default Dashboard;
