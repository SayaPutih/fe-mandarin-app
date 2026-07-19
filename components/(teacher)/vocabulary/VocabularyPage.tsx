"use client";

import VocabularyHeader from "./VocabularyHeader";
import VocabularySearch from "./VocabularySearch";
import VocabularyStats from "./VocabularyStats";
import VocabularyTable from "./VocabularyTable";
import Pagination from "@/components/ui/Pagination";
import CreateVocabularyModal from "./CreateVocabularyModal";
import { LoadingSpinner } from "@/components/ui/Loading";
import { useVocabulary } from "@/hooks/useVocabulary";

export default function VocabularyPage() {
  const {
    loading,
    words,
    pagination,
    page,
    setPage,
    search,
    setSearch,
    showModal,
    setShowModal,
    form,
    setForm,
    handleCreate,
  } = useVocabulary();


  if (loading) {
    return (
      <LoadingSpinner label="loading" />
    );
  }

  return (
    <div className="min-h-screen rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 p-4">

      <div className="p-4">
        <VocabularyHeader onAdd={() =>setShowModal(true)}/>
        <VocabularyStats/>
      </div>

      <div className="rounded-2xl rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">

        <div className="overflow-x-auto rounded-xl bg-white sm:p-2">

          <VocabularySearch
            search={search}
            setSearch={setSearch}
            total={words.length}
          />

          <VocabularyTable
            words={words}
            search={search}
          />

          <Pagination
            page={page}
            totalPages={pagination?.totalPages || 1}
            setPage={setPage}
          />

        </div>

      </div>

      <CreateVocabularyModal
        open={showModal}
        onClose={() =>setShowModal(false)}
        onCreate={handleCreate}
        form={form}
        setForm={setForm}
      />

    </div>
  );
}